var express = require('express');
var router = express.Router();
var knex = require('knex')

//USE ENV FILE
require('dotenv').config();
const env = process.env;

// IMPORT FUNCTIONS
const validatePassword = require('./functions/validatePassword')
const formatDate = require('./functions/formatDate')

//ENABLE BODY OF FORMS TO BE READ
router.use(express.urlencoded({ extended: false }));

const db = knex({
    client: 'pg',
    connection:{
        host: env.PG_HOST,
        user: env.PG_USER,
        password: env.PG_PASSWORD,
        database: env.PG_USER
    }
});



router.post("/authenticate", async function (req, res) {

    console.log(req.body);

    db('users').where({ email: req.body.email })
        .then(async userCreds => {
            if (userCreds[0]) {
                const passwordIsValid = await validatePassword(req.body.password, userCreds[0].password);
                if (passwordIsValid) {
                    res.json({token: userCreds[0].token, userID: userCreds[0].userID, firstname: userCreds[0].firstname});
                }
                else{res.json({ token: false });}
            } 
            else {
                res.json({ token: false });
            }
        });
})




//GET DATA FOR DASHBOARD
async function getFromDB(requestParams) {
    const credentials = await db('users').where({token:requestParams.token})
    if(credentials[0]){
        const allData = await db('tracking_data').where({userID:credentials[0].userID});
        if(allData[0]){
            return allData
        }
        else {return false}
    }
    else{
        return false
    }
}

router.post("/trackdata", async function (req, res, next) {
    
    try{
        res.json(await getFromDB(req.body));
    }catch(e){
        console.log(e);
        res.sendStatus(404);
    }
});



//INSERT TRACKING DATA
//SET DATE AND TIME
let todayDateTime = () => {return new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" });}
let todayDate = ()=> {
    console.log(todayDateTime())
    return todayDateTime().split(",")[0]
}
let todayTime = () => {return todayDateTime().split(',')[1]}


async function insertIntoDB(request) {

    request["date"] = formatDate(todayDate());
    request["time"] = todayTime();

    let dataToInsert = request;
    delete dataToInsert.token;

    try{
        await db('tracking_data').insert(dataToInsert);
    }
    catch(err){
        console.log(err);
    }
}


async function checkUser(request) {
    const userCreds = await db('users').where({ token: JSON.parse(request.body.token) });
    console.log(userCreds)
    if (userCreds[0]) {
        const sendThis = await db('tracking_data').where('userID', userCreds[0].userID)
        if (sendThis[0]){
            return sendThis
        }
        else{return 'empty'}
    } else {
        return false
    }
}

router.post("/", async function (req, res) {
    let prevUserTrackData = await checkUser(req);
    if(prevUserTrackData=='empty'){
        const insterted = insertIntoDB(req.body);
        res.json({ inserted: true })
    }
    else{
        if (prevUserTrackData) {
            if (prevUserTrackData[prevUserTrackData.length - 1].date === formatDate(todayDate())) {
                console.log('Entry already made today.');
                res.json({ inserted: false });
            }
            else {
                const insterted = insertIntoDB(req.body);
                res.json({ inserted: true })
            }
    }
    }
})



module.exports = router;