const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/getAllFamilyNotes', (req, res) => {
    let sql = 'Select * from FamilyMemberNotes where FamilyID=?';
    db.query(sql,[req.body.FamilyID], (err, result) => {
      if(err) console.log(err);
      else res.send(result);
    })
});

router.post('/updateMemberNotes', (req,res) => {
  let sql = 'UPDATE FamilyMemberNotes SET personNotes=? WHERE FamilyID=? AND personID=?;';
  db.query(sql, [req.body.personNotes, req.body.FamilyID, req.body.personID], (err, result) => {
    if(result.affectedRows === 0) {
      let sql2 = 'INSERT INTO FamilyMemberNotes(FamilyID,personID,personNotes) VALUES(?,?,?);';
      db.query(sql2, [req.body.FamilyID, req.body.personID, req.body.personNotes], (err, result) => {
        if(err) console.log(err);
        else return res.send({ message : "Saved", result });
      })
    }
    else return res.send({ message : "Updated", result });
  })

});

// To delete all the Family Notes data of a particular Client (Array):
router.post('/deleteAllFamilyNotes', (req, res) => {
  let sql = 'Delete from FamilyMemberNotes WHERE FamilyID IN ';
  let conditions = '(';
  req.body.forEach((row, i)=>{ conditions += (row + ','); });
  conditions = conditions.slice(0, -1) + ');';
  db.query(sql + conditions, (err, result) => {
      if(err) console.log(err);
      else res.send({ message : "DELETED", result });
  })
})

module.exports = router;