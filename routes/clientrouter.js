const express = require('express');
const router = express.Router();
const multer = require('multer');
const { rMap, csvHeaders, CreateDataObjects, toTitleCase, parseNumber, parseDate } = require('../keys/helpers');
const db = require('../db/connection');
const {separateFamilies} = require('../keys/separateFamiliesLogic');

const XLSX = require('xlsx');

var upload = multer({          // checking in the backend (again), the format the uploaded file
    filename: 'csvfile',
    fileFilter: (req, file, cb) => {
        // console.log('file mimetype', file.mimetype)
        if (file.mimetype == "text/csv"
            || file.mimetype == 'application/vnd.ms-excel'
            || file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .csv/ .xlsx/ .xls formats are allowed!'));
        }
        // cb(null, true);
    }
});

router.post('/uploadcsv', upload.single('csvfile'), (req, response) => {
    let nodes = [];
    let success = true;

    let sheetNo = 0;   // input sheet number
    let temp2 = XLSX.read(req.file.buffer, {type:'buffer'});
    const ws = temp2.Sheets[temp2.SheetNames[sheetNo]];

    var skipStartingRows = 0;   /// starting n rows will be skipped

    var range = XLSX.utils.decode_range(ws['!ref']);
    range.s.r+= skipStartingRows;
    if(range.s.r >= range.e.r) range.s.r = range.e.r;
    ws['!ref'] = XLSX.utils.encode_range(range);            /////  range updated after skipping rows

    const data = XLSX.utils.sheet_to_json(ws, {raw:false, dateNF:'dd-mm-yyyy'});
    const rows = CreateDataObjects(data);    // formatting and filtering the data

    if(rows.length == 0) success = false;

    if(success)
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (Object.keys(row).length === 5) {
            if( (row[csvHeaders[0]] != '' && row[csvHeaders[0]] != undefined) &&
             (row[csvHeaders[1]] != '' && row[csvHeaders[1]] != undefined) &&
             (row[csvHeaders[2]] != '' && row[csvHeaders[2]] != undefined) &&
             (row[csvHeaders[3]] != '' && row[csvHeaders[3]] != undefined) &&
             (row[csvHeaders[4]] != '' && row[csvHeaders[4]] != undefined) ){

                const node = {
                    pid: row[csvHeaders[0]],
                    pp: toTitleCase(row[csvHeaders[1]]),
                    sid: row[csvHeaders[2]],
                    sp: toTitleCase(row[csvHeaders[3]]),
                    r: row[csvHeaders[4]].toLowerCase()
                }
                if(rMap[node.r] === undefined){
                    response.send({message: 'Unknown Relationships in Data'});
                    return;
                } else {
                    nodes.push(node);
                }
            }
        } else {
            success = false;
            break;
        }
    }

    // console.log('nodes: ',nodes);
    if(nodes.length == 0) success = false;

    if (success) {

        console.log('CSV file successfully processed');

        let families = separateFamilies(nodes);

        // families.forEach((family, index) => {
        //     const resultArray = family.resultArray;
        //     const client = family.client;
        //     // console.log(resultArray);
        //     const clientName = client.personName.split(' ');

        //     let sql1 = 'Insert INTO ClientFirmRelateIDt() Values();';   // FamilyID to be inserted 26 lines below
        //     db.query(sql1, client.personID, (err, res) => {
        //         if (err) console.log(err);
        //         else {
        //             let ClientFirmRelateID = res.insertId;

        //             let sql, set;
        //             if(clientName.length == 1){
        //                 sql = 'INSERT INTO ClientDt(personID,ClntFirstName, ClientFirmRelateID) VALUES(?,?,?);';
        //                 set = [client.personID,clientName[0], ClientFirmRelateID];
        //             }
        //             else if(clientName.length == 2){
        //                 sql = 'INSERT INTO ClientDt(personID, ClntFirstName, ClntLastName, ClientFirmRelateID) VALUES(?,?,?,?);';
        //                 set = [client.personID, clientName[0], clientName[1], ClientFirmRelateID];
        //             }
        //             else {
        //                 sql = 'INSERT INTO ClientDt(personID, ClntFirstName, ClntMiddleInitial, ClntLastName, ClientFirmRelateID) VALUES(?,?,?,?,?);';
        //                 let lastName = '';
        //                 for(let i = 2; i < clientName.length; i++) (i!=clientName.length-1)? lastName += clientName[i] + ' ': lastName += clientName[i];
        //                 set = [client.personID,clientName[0], clientName[1], lastName, ClientFirmRelateID];
        //             }
        //             db.query(sql, set, (err, res) => {
        //                 if (err) console.log(err);
        //                 else {
        //                     let ClientID = res.insertId;

        //                     let updateSql = 'UPDATE ClientFirmRelateIDt SET FamilyID = ? where ClientFirmRelateID = ?'
        //                     db.query(updateSql, [ClientID, ClientFirmRelateID], (err, res) => {
        //                         if(err) console.log(err);
        //                         else {
        //                             let error = false;
        //                             sql = 'INSERT INTO ClientCSV(personID, name, level, siblinglevel, relation, relatedTo, ClientID) VALUES(?, ?, ?, ?, ?, ?, ?)';
        //                             for (let i = 0; i < resultArray.length; i++) {
        //                                 let obj = resultArray[i].value;
        //                                 db.query(sql, [obj.personID, obj.personName, obj.level, obj.siblingLevel, obj.relation, obj.to, ClientID], (err, res) => {
        //                                     if (err) {
        //                                         // console.log(err);
        //                                         error = true;
        //                                     }
        //                                     if(index === families.length - 1 && i === resultArray.length-1)
        //                                         response.send({ data: families, message: "UPLOADED" });
        //                                 });
        //                                 if (error) break;
        //                             }

        //                             sql2 = 'INSERT INTO FamilyRelations() VALUES()';
        //                             //

        //                         }
        //                     })

        //                 }
        //             })
        //         }
        //     })
        // })


        families.forEach((family, index) => {
            const resultArray = family.result;
            const client = family.client;
            // console.log('function for families2 called', family);
            const clientName = client.personName.split(' ');

            let sql1 = 'Insert INTO ClientFirmRelateIDt() Values();';   // FamilyID to be inserted 26 lines below
            db.query(sql1, client.personID, (err, res) => {
                if (err) console.log(err);
                else {
                    let ClientFirmRelateID = res.insertId;

                    let sql, set;
                    if(clientName.length == 1){
                        sql = 'INSERT INTO ClientDt(personID,ClntFirstName, ClientFirmRelateID) VALUES(?,?,?);';
                        set = [client.personID,clientName[0], ClientFirmRelateID];
                    }
                    else if(clientName.length == 2){
                        sql = 'INSERT INTO ClientDt(personID, ClntFirstName, ClntLastName, ClientFirmRelateID) VALUES(?,?,?,?);';
                        set = [client.personID, clientName[0], clientName[1], ClientFirmRelateID];
                    }
                    else {
                        sql = 'INSERT INTO ClientDt(personID, ClntFirstName, ClntMiddleInitial, ClntLastName, ClientFirmRelateID) VALUES(?,?,?,?,?);';
                        let lastName = '';
                        for(let i = 2; i < clientName.length; i++) (i!=clientName.length-1)? lastName += clientName[i] + ' ': lastName += clientName[i];
                        set = [client.personID,clientName[0], clientName[1], lastName, ClientFirmRelateID];
                    }
                    db.query(sql, set, (err, res) => {
                        if (err) console.log(err);
                        else {
                            let FamilyID = res.insertId;

                            let updateSql = 'UPDATE ClientFirmRelateIDt SET FamilyID = ? where ClientFirmRelateID = ?'
                            db.query(updateSql, [FamilyID, ClientFirmRelateID], (err, res) => {
                                if(err) console.log(err);
                                else {
                                    let error = false;
                                    sql = 'INSERT INTO FamilyRelations(ClientID_1, ClientName_1, ClientID_2, ClientName_2, csvRelation, FamilyID) VALUES(?, ?, ?, ?, ?, ?)';
                                    for (let i = 0; i < resultArray.length; i++) {
                                        let obj = resultArray[i];
                                        db.query(sql, [obj.pid, obj.pp, obj.sid, obj.sp, obj.r, FamilyID], (err, res) => {
                                            if (err) {
                                                console.log(err);
                                                error = true;
                                            }
                                            if(index === families.length - 1 && i === resultArray.length-1)
                                                response.send({ data: families, message: "UPLOADED" });
                                        });
                                        if (error) break;
                                    }
                                }
                            })

                        }
                    })
                }
            })
        })




    } else {
        console.log('Invalid CSV file');
        response.send({message: "Invalid CSV file"});
    }

})

router.post('/getclientDt', (req,res)=>{
    const id = req.body.id;
    let sql = 'Select * from ClientDt WHERE ClientID = ?';
    db.query(sql, id ,(err, result) => {
        if(err) console.log(err);
        else {
            res.send(result);
        }
    })
})

router.get('/getAllClients', (req,res) => {
    let sql = 'Select * from ClientDt';
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        else {
            console.log("Got all client Data");
            res.send(result);
        }
    })
})


// router.get('/getAllRelations',(req,res) => {
//     let sql = 'Select * from ClientCSV';
//     db.query(sql, (err, result) => {
//         if(err) console.log(err);
//         else{
//             // console.log("got all levels",result);
//             let finalArr =[];
//             if(result.length === 0) {
//                 res.send(finalArr);
//                 return;
//             }
//             var id = result[0].ClientID;
//             var value = []
//             result.forEach( item => {
//                 if( item.ClientID === id ){
//                     value.push(item);
//                 }else{
//                     value.sort(function(a,b){
//                         if( a.level <= b.level ) return 1;
//                         else return -1;
//                     } );
//                     finalArr.push({
//                         id,
//                         value
//                     });
//                     id = item.ClientID;
//                     value = [];
//                     value.push(item);
//                 }
//             });
//             if(id !== -1){
//                 value.sort(function(a,b){
//                     if( a.level <= b.level ) return 1;
//                     else return -1;
//                 } );
//                 finalArr.push({
//                     id,
//                     value
//                 });
//             }
//             res.send(finalArr);
//         }
//     })
// })


router.get('/getAllRelations',(req,res) => {
    let sql = 'Select * from FamilyRelations';

    db.query(sql, (err, result) => {

        if(err) console.log(err);
        else{
            // res.send(result);
            let finalArr =[];
            if(result.length === 0) {
                res.send(finalArr);
                return;
            }
            var id = result[0].FamilyID;
            var value = []
            result.forEach( item => {
                if( item.FamilyID === id ){
                    value.push(item);
                }else{
                    finalArr.push({
                        id,
                        value
                    });
                    id = item.FamilyID;
                    value = [];
                    value.push(item);
                }
            });
            if(id !== -1){
                finalArr.push({
                    id,
                    value
                });
            }
            res.send(finalArr);
        }

    })

})



router.post('/getFamilyRelations',(req,res) => {
    let sql = 'Select * from FamilyRelations WHERE FamilyID = ?';

    db.query(sql, [req.body.FamilyId], (err, result) => {

        if(err) console.log(err);
        else{
            // res.send(result);
            let finalArr =[];
            if(result.length === 0) {
                res.send(finalArr);
                return;
            }
            var id = result[0].FamilyID;
            var value = []
            result.forEach( item => {
                if( item.FamilyID === id ){
                    value.push(item);
                }else{
                    finalArr.push({
                        id,
                        value
                    });
                    id = item.FamilyID;
                    value = [];
                    value.push(item);
                }
            });
            if(id !== -1){
                finalArr.push({
                    id,
                    value
                });
            }
            res.send(finalArr);
        }

    })

})


router.post('/getRelationTable', (req, res) =>{
    let sql = 'SELECT * from ClientClientRelateDt where ClientID_1 = ? and ClientID_2 = ? and FamilyID = ?';
    db.query(sql, [req.body.client1, req.body.client2, req.body.clientId], (err, result) => {
        if(err) {
            console.log(err);
            res.send('not ok')
        }
        else{
            if(result.length == 0){
                let sql2 = 'INSERT INTO ClientFirmRelateIDt(FamilyID) Values(?);'
                db.query(sql2, req.body.clientId, (err, result) => {
                    if(err) console.log(err);
                    else{
                        let sql3 = 'INSERT INTO ClientClientRelateDt(ClientID_1, ClientID_2, ClientFirmRelateID, FamilyID) Values(?,?,?,?)';
                        db.query(sql3, [req.body.client1, req.body.client2, result.insertId, req.body.clientId], (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                db.query(sql, [req.body.client1, req.body.client2, req.body.clientId], (err, result) => {
                                    if(err) {
                                        console.log(err);
                                        res.send('not ok')
                                    } else {
                                        res.send(result[0]);
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                // console.log(result);
                res.send(result[0]);
            }
        }
    })
})

router.post('/updateRelationTable', (req, res) => {
    let sql = 'UPDATE ClientClientRelateDt SET CCRelateName = ?, CCRelateDescription = ? where ClntClntRelateID = ?';
    const data = req.body;
    db.query(sql, [data.CCRelateName, data.CCRelateDescription, data.ClntClntRelateID], (err, result) => {
        if(err) console.log(err);
        else {
            // console.log(result);
            res.send(result);
        }
    })
})

router.post('/updateclientdt', (req, res) => {
    let sql = 'UPDATE ClientDt SET ClntFirstName = ?, ClntMiddleInitial= ?, ClntLastName= ?, ClntCrmReference= ?, ClntCrmSyncStatus= ?, LastSyncedDate= ?,  ClientPhoto= ?,ClientNotes1= ?,ClientNotes2= ?,Gender= ?,DateOfBirth= ?,BizTypeID= ?,BizOperatorID= ?,ClientFirmRelateID= ? ' +
    'WHERE ClientID = ?';
    const data = req.body.data;
    const values = [
        data.ClntFirstName,
        data.ClntMiddleInitial,
        data.ClntLastName,
        data.ClntCrmReference,
        data.ClntCrmSyncStatus,
        parseDate(data.LastSyncedDate),
        data.ClientPhoto,
        data.ClientNotes1,
        data.ClientNotes2,
        data.Gender,
        parseDate(data.DateOfBirth),
        parseNumber(data.BizTypeID),
        parseNumber(data.BizOperatorID),
        parseNumber(data.ClientFirmRelateID)
    ];
    // console.log(values);
    db.query(sql,[...values, req.body.clientId] , (err, result1) => {
        if(err) console.log(err);
        else {
            if(parseNumber(data.BizTypeID) !== null){
                db.query('UPDATE ClientFirmRelateIDt SET BizTypeID = ? where ClientFirmRelateID = ?', [parseNumber(data.BizTypeID),
                    parseNumber(data.ClientFirmRelateID)], (err, result2) => {
                    if(err) console.log(err);
                    else {
                        console.log(result1, result2);
                        res.send('success');
                    }
                })
            } else {
                res.send('success');
            }
        }
    })
})
router.post('/updateClntFrm', (req, res) => {
    const data = req.body;
    const values = [
        data.CFRelateName,
        data.CFRelateDescription,
        data.CFRelateBizStatus,
        data.CFRelateBizPotential,
        parseNumber(data.CFRelateOwnerID),
        parseNumber(data.BizTypeID),
    ];
    // console.log(values);
    let sql = 'UPDATE ClientFirmRelateIDt SET CFRelateName = ?, CFRelateDescription = ?, CFRelateBizStatus = ?, CFRelateBizPotential = ?, CFRelateOwnerID = ?, BizTypeID = ? where ClientFirmRelateID = ?';
    db.query(sql, [...values, data.ClientFirmRelateID], (err, result) => {
        if(err) console.log(err);
        else {
            if(parseNumber(data.BizTypeID) !== null){
                db.query('UPDATE ClientDt SET BizTypeID = ? where ClientFirmRelateID = ?', [parseNumber(data.BizTypeID),
                parseNumber(data.ClientFirmRelateID)], (err, result2) => {
                    if(err) console.log(err);
                    else {
                        res.send('success');
                    }
                })
            } else {
                res.send('success');
            }
        }
    })
})
router.post('/deleteclients', (req, res) => {
    let sql1 = 'Delete from ClientCSV where ';
    let sql2 = 'Delete from ClientDt where ';
    let sql3 = 'Delete from ClientClientRelateDt where ';
    let sql4 = 'Delete from ClientFirmRelateIDt where ';
    let sql5 = 'Delete from FamilyRelations where ';
    let conditions1 = '';
    req.body.forEach((row, i)=>{
        if(i == 0) conditions1 += 'ClientID = ' + row;
        else conditions1 += ' OR ClientID = ' + row;
    })
    let conditions2 = '';
    req.body.forEach((row, i)=>{
        if(i == 0) conditions2 += 'FamilyID = ' + row;
        else conditions2 += ' OR FamilyID = ' + row;
    })
    db.query(sql1 + conditions1, (err, result) => {
        if(err) console.log(err);
        else {
            db.query(sql2 + conditions1, (err, result) => {
                if(err) console.log(err);
                else {
                    db.query(sql3 + conditions2, (err, result) => {
                        if(err) console.log(err);
                        else {
                            db.query(sql4 + conditions2, (err, result) => {
                                if(err) console.log(err);
                                else {
                                    db.query(sql5 + conditions2, (err, result) => {
                                        if(err) console.log(err);
                                        else {
                                            console.log({ message : "DELETED", result });
                                            res.send({ message : "DELETED", result });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })


    db.query(sql5 + conditions2, (err, result) => {
        if(err) console.log(err);
        else {
        }
    })
})

router.post('/getClntFrm', (req,res) => {
    console.log(req.body);
    let sql = 'Select  * from ClientFirmRelateIDt where ClientFirmRelateID = ?';
    db.query(sql, req.body.ClientFirmRelateID, (err, result) => {
        if(err) console.log(err);
        else {
            res.send(result);
        }
    })
})

module.exports = router;

