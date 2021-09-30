const express = require('express');
const router = express.Router();
const db = require('../db/connection');


router.get('/getclients', (req , res) => {
    let sql = 'SELECT ClientID, ClntFirstName, ClntLastName FROM ClientDt';
    db.query(sql, (err,result) => {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    })
})

router.post('/getlevels', (req, res) => {
    let sql = 'SELECT * FROM ClientCSV WHERE ClientID = ? ORDER BY level DESC';
    db.query(sql, req.body.clientId ,(err, result) => {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    })
})

router.post('/getslevels', (req, res) => {
    let sql = 'SELECT MAX(siblinglevel) as "sLevel" FROM ClientCSV WHERE ClientID = ?';
    db.query(sql, req.body.clientId ,(err, result) => {
        if (err) console.log(err);
        else {
            // console.log(result)
            res.send(result);
        }
    })
})

router.post('/getglevels', (req, res) => {
    let sql = 'SELECT level FROM ClientCSV WHERE ClientID = ? ORDER BY level DESC';
    db.query(sql, req.body.clientId ,(err, result) => {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    })
})

router.post('/editname', (req,res) => {
    let sql = 'UPDATE ClientCSV SET name = ? where id = ?';
    db.query(sql, [req.body.name, req.body.id], (err, result) => {
        if(err) console.log(err);
        else {
            res.send(result);
        }
    })
})
module.exports = router;