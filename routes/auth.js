const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let sql = 'Select * from login where email = ?';
    db.query(sql, req.body.email, (err, result) => {
        if(result?.length === 0) {
            res.send({'status': false, 'error' : 'This email is not authenticated'});
        } else if(result[0].password == req.body.password){
            var token = jwt.sign(req.body, process.env.SECRET_KEY);  // creating token here
            res.send({'status': true, 'token': token});
        } else {
            res.send({'status': false, 'error' : 'Invalid password'});
        }
    })
});


router.post('/loginThroughCookies', (req, res) => {
    let sql = 'Select * from login where email = ?';
    var decoded = 0;
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, decode_object) => {    // decoding jwt token here when login through cookies
        if(err) decoded=0;
        else decoded = decode_object;
    });

    if(decoded) {
        db.query(sql, decoded.email, (err, result) => {
            if(result?.length === 0) {
                res.send({'status': false});
            } else if(result[0].password == decoded.password){
                res.send({'status': true});
            } else {
                res.send({'status': false});
            }
        })
    } else {
        res.send({'status': false});
    }
});

module.exports = router;

/*
    **** These SQL queries should be hard coded in the data base: ****

   CREATE TABLE login(email nvarchar(255), password varchar(100));
   INSERT INTO login Values('senthil@zettaone.com', 'password');

*/