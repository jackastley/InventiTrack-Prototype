const knex = require('knex');
const encryptPassword = require('./encryptPassword')

//USE ENV FILE
require('dotenv').config();
const env = process.env;

const db = knex({
    client: 'pg',
    connection:{
        host: env.PG_HOST,
        port: env.PG_PORT,
        user: env.PG_USER,
        password: env.PG_PASSWORD,
        database: env.PG_USER
    }
});


async function addUser(email, password, firstName, lastName){
    const encryptedPassword = await encryptPassword(password);

    function generateToken() {
        const rand = function () {
            return Math.random().toString(36).substr(2);
        };
    
        const token = function () {
            return rand() + rand();
        };
    
        return token()
    }

    const userCredentials = {
        email: email,
        password: encryptedPassword,
        firstname: firstName,
        lastname: lastName,
        token: generateToken()
    }

    try{
        await db('users').insert(userCredentials);
    }
    catch(err){
        console.log(err);
    }

    console.log(await db('users'))
}

addUser('testUser@test.com','testPassword', 'testFirstName', 'testLastName')
