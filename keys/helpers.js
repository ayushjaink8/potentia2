const rMap = {
    'great-grandson':-3, 'great-granddaughter':-3,
    'grandson': -2,'granddaughter': -2,
    'son':-1,'daughter':-1,'nephew':-1,'niece':-1,
    'wife':0,'husband':0,'brother':0,'sister':0,'cousin':0,'brother-in-law':0,'sister-in-law':0,'fiance':0,
    'father':1,'mother':1,'father-in-law':1,'mother-in-law':1,'uncle':1,'aunt':1,'maternal-uncle':1,'paternal-uncle':1,'maternal-aunt':1,'paternal-aunt':1,
    'grandfather':2,'grandmother':2,
    'great-grandfather':3,'great-grandmother':3
}

const csvHeaders = [
    'PID', 'Primary Person', 'SID', 'Secondary Person', 'Relationship'
]

function CreateDataObjects(data){
    const result = [];
    data.forEach( rel => {
        let objArray = Object.values(rel);
        let obj = {};
        if(objArray.length === 5){
            obj = {
                'PID':objArray[0],
                'Primary Person':objArray[1],
                'SID':objArray[2],
                'Secondary Person':objArray[3],
                'Relationship':objArray[4]
            };
        } else {
            obj = {
                'PID':objArray[3],
                'Primary Person':objArray[1]+" "+objArray[0],
                'SID':objArray[9],
                'Secondary Person':objArray[6]+" "+objArray[7],
                'Relationship':objArray[13]
            };
        }
        if(obj['PID']!=='***' && obj['SID']!=='***')  result.push(obj);
    });
    return result;
}

const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

function parseNumber(number){
    if(number == null)
        return null;
    else
        return parseInt(number);
}
function parseDate(date){
    if(date == null)
        return null;
    else {
        return (new Date(date));
    }
}
module.exports = {
    rMap,
    csvHeaders,
    CreateDataObjects,
    toTitleCase,
    parseNumber,
    parseDate,
}