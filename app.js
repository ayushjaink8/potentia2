const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
require('dotenv').config();

const path = require('path');

const app = express();
require('./db/connection');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

const clientRouter = require('./routes/clientrouter');
const dashboardRouter = require('./routes/dashboardrouter');
const loginRouter = require('./routes/auth');
const businessRouter = require('./routes/businessrouter');
const familyRouter = require('./routes/familyrouter');

app.use('/api/client', clientRouter);
app.use('/api/dashboard',dashboardRouter);
app.use('/api/login', loginRouter);
app.use('/api/biz', businessRouter);
app.use('/api/family', familyRouter);

app.get("/api", (req,res) => {
    res.send({message :"Server is running! \n This msg is coming from app.js"})
})

app.get("/*", (req,res) => {
    res.redirect("/");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Server is lit on http://localhost:${PORT}`);
    }
})
