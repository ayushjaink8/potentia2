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


module.exports = router;