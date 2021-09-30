const rMap = {
    'great-grandson':-3, 'great-granddaughter':-3,
    'grandson': -2,'granddaughter': -2,
    'son':-1,'daughter':-1,'nephew':-1,'niece':-1,
    'wife':0,'husband':0,'brother':0,'sister':0,'cousin':0,'brother-in-law':0,'sister-in-law':0,'fiance':0,
    'father':1,'mother':1,'father-in-law':1,'mother-in-law':1,'uncle':1,'aunt':1,'maternal-uncle':1,'paternal-uncle':1,'maternal-aunt':1,'paternal-aunt':1,
    'grandfather':2,'grandmother':2,
    'great-grandfather':3,'great-grandmother':3
}
// const siblingMap = {
//     'great-grandson':0, 'great-granddaughter':0,
//     'grandson': 0,'granddaughter': 0,
//     'son':0,'daughter':0,'nephew':1,'niece':1,
//     'wife':1,'husband':1,'brother':1,'sister':1,'cousin':1,'brother-in-law':2,'sister-in-law':2,'fiance':1,
//     'father':0,'mother':0,'father-in-law':1,'mother-in-law':1,'uncle':1,'aunt':1,'maternal-uncle':1,'paternal-uncle':1,'maternal-aunt':1,'paternal-aunt':1,
//     'grandfather':0,'grandmother':0,
//     'great-grandfather':0,'great-grandmother':0
// }
// const oppositeMap = {
//     'great-grandson':'great-grandparent', 'great-granddaughter':'great-grandparent',
//     'grandson': 'grandparent','granddaughter': 'grandparent',
//     'son':'parent','daughter':'parent','nephew':'uncle/aunt','niece':'uncle/aunt',
//     'wife':'husband','husband':'wife','brother':'sibling','sister':'sibling','cousin':'cousin','brother-in-law':'sibling-in-law','sister-in-law':'sibling-in-law','fiance':'fiance',
//     'father':'child','mother':'child','father-in-law':'child-in-law','mother-in-law':'child-in-law','uncle':'nibling','aunt':'nibling','maternal-uncle':'nibling','paternal-uncle':'nibling','maternal-aunt':'nibling','paternal-aunt':'nibling',
//     'grandfather':'grandchild','grandmother':'grandchild',
//     'great-grandfather':'great-grandson','great-grandmother':'great-grandson'
// }

const csvHeaders = [
    'PID', 'Primary Person', 'SID', 'Secondary Person', 'Relationship'
]

// function csvToArray(str, delimiter = ",") {
//     const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
//     for(let i = 0; i < 5; i++) {
//         headers[i] = headers[i].trim();
//         if(headers[i] != csvHeaders[i]) return [];
//     }
//     const rows = str.slice(str.indexOf("\n") + 1).split("\n");
//     const result = rows.map(function (row) {
//         const values = row.split(delimiter);
//         const el = headers.reduce(function (object, header, index) {
//             object[header] = values[index]?.trim();
//             return object;
//         }, {});
//       return el;
//     });
//     return result;
// }

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
    // oppositeMap,
    // siblingMap,
    csvHeaders,
    // csvToArray,
    CreateDataObjects,
    toTitleCase,
    parseNumber,
    parseDate,
}