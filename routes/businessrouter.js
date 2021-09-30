const express = require("express");
const router = express.Router();
const db = require("../db/connection");

//to get the list of all current business Types present in the database:

router.get('/getBusinessType', (req, res) => {
  let sql = "SELECT * FROM business_type";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

///  to delete BizType from the database ...
router.post('/deleteBizType', (req, res) => {

  let sql = "Delete from business_type WHERE BizTypeID=?";
  let sql2 = "Delete from business_type_data WHERE BizTypeID=?";

  let res1=0, res2=0;
  db.query(sql,[req.body.BizTypeID], (err, result) => {
    if (err) console.log(err);
    else res1 = result;
  });
  db.query(sql2,[req.body.BizTypeID], (err, result) => {
    if (err) console.log(err);
    else res2 = result;
  });

  res.send([res1, res2]);

});

/// to add a custom BizType into the database ...
router.post('/addCustomBizType', (req, res) => {
  let sql = "INSERT INTO business_type(BizTypeName) Values(?)";
  db.query(sql,[req.body.BizTypeName], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});



/// addClientBizType  removeClientBizType  editClientBizType getClientBizType    ---for a particular client
router.post('/addClientBizType', (req, res) => {
    let sql = "INSERT INTO business_type_data(ClientID, BizTypeID, BizTypeName, BizTypeDesc) Values(?,?,?,?);";
    db.query(sql, [req.body.ClientID, req.body.BizTypeID, req.body.BizTypeName, req.body.BizTypeDesc], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

router.post('/editClientBizType', (req, res) => {
  let sql = "UPDATE business_type_data SET BizTypeDesc= ? WHERE ClientID=? AND BizTypeID=?";
  db.query(sql, [req.body.BizTypeDesc, req.body.ClientID, req.body.BizTypeID], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
  });
});

router.post('/getClientBizType', (req, res) => {
  let sql = "SELECT * from business_type_data WHERE ClientID = ?";
  db.query(sql, req.body.ClientID, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.send(result);
    }
  });
});

router.post('/removeClientBizType', (req, res) => {
  let sql = 'Delete from business_type_data WHERE BizTypeID IN ';
  let conditions = '(';
  req.body[0].forEach((row, i)=>{ conditions += (row + ','); });
  conditions = conditions.slice(0, -1) + ') AND ClientID = ' + req.body[1] + ';';
  db.query(sql + conditions, (err, result) => {
      if(err) console.log(err);
      else res.send({ message : "DELETED", result });
  })
})


// To delete all the Biz data of a particular Client:

router.post('/deleteClientBizData', (req, res) => {
  let sql = 'Delete from business_type_data WHERE ClientID IN ';
  let conditions = '(';
  req.body.forEach((row, i)=>{ conditions += (row + ','); });
  conditions = conditions.slice(0, -1) + ');';
  db.query(sql + conditions, (err, result) => {
      if(err) console.log(err);
      else res.send({ message : "DELETED", result });
  })
})



//////////////////////   Old routes ...

// Get business type details by business_type_id
// router.post("/getBusinessTypeById", (req, res) => {
//   let sql = "SELECT * FROM business_type where business_type_id=?";
//   db.query(sql, req.body.BizTypeID, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get business type details by business_type_name
// router.post("/getBusinessTypeByName", (req, res) => {
//   let sql = "SELECT * FROM business_type where business_type_name=?";
//   db.query(sql, req.body.BizTypeName, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get all web access rights details
// router.get("/getWebAccessRights", (req, res) => {
//   let sql = "SELECT * FROM web_access_rights ORDER BY creation_time DESC";
//   db.query(sql, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get web access rights details by web_access_rights_id
// router.post("/getWebAccessRightsById", (req, res) => {
//   let sql = "SELECT * FROM web_access_rights where web_access_rights_id=?";
//   db.query(sql, req.body.WbAcsRightsId, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get web access rights details by WbAcsRightsName
// router.post("/getWebAccessRightsByName", (req, res) => {
//   let sql = "SELECT * FROM web_access_rights where web_access_rights_name=?";
//   db.query(sql, req.body.WbAcsRightsName, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get all client client relation definition details
// router.get("/getClientClientRelateDefDetails", (req, res) => {
//   let sql =
//     "SELECT * FROM client_client_relation_definition ORDER BY creation_time DESC";
//   db.query(sql, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get all client client relation definition details by id
// router.post("/getClientClientRelateDefDetailsById", (req, res) => {
//   let sql =
//     "SELECT * FROM client_client_relation_definition where client_client_relation_definition_id= ?";
//   db.query(sql, req.body.ClntClntRelateDefId, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// // Get all client client relation definition details by name
// router.post("/getClientClientRelateDefDetailsByName", (req, res) => {
//   let sql =
//     "SELECT * FROM client_client_relation_definition where client_client_relation_definition_name= ?";
//   db.query(sql, req.body.CCRelateDefName, (err, result) => {
//     if (err) console.log(err);
//     else {
//       res.send(result);
//     }
//   });
// });

// //////////////////   Temp tables for testing local MySQL database    //////////////////////////////

// router.post("/getBizData", (req, res) => {
//   let sql = "SELECT * from BizTable where FamilyId=?";
//   db.query(sql, [req.body.FamilyID], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send("not ok");
//     } else {
//       if (result.length == 0) {
//         let sql2 = "INSERT INTO BizTable(FamilyID) Values(?);";
//         db.query(sql2, [req.body.FamilyID], (err, result) => {
//           if (err) console.log(err);
//           else res.send(result[0]);
//         });
//       } else {
//         res.send(result[0]);
//       }
//     }
//   });
// });

// router.post("/updateBizData", (req, res) => {
//   let sql =
//     "UPDATE BizTable SET BizTypeID = ?, BizTypeName = ?, BizTypeDesc=? WHERE FamilyID = ?";
//   const data = req.body;
//   db.query(
//     sql,
//     [data.BizTypeID, data.BizTypeName, data.BizTypeDesc, data.FamilyID],
//     (err, result) => {
//       if (err) console.log(err);
//       else {
//         //   console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

/////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
