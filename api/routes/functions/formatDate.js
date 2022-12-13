
function formatDate(date){
    //INPUT FORMAT: MM/DD/YYYY
    const dateArray = date.split('/');

    const formatedDate = dateArray[1]+'/'+dateArray[0]+'/'+dateArray[2].substring(2,4);


    return formatedDate
}

module.exports = formatDate;