const express = require("express");
const bodyParser = require("body-parser"); 
var session = require('express-session')
const app = express();
const webRouter = require('./routes/web');


var cors = require('cors')

// app.get('/',( req, res) => {
// res.send("helloworld");
// })

app.use( bodyParser.json());
 app.use(session({
    secret: '&@IUeXGShJ&eAE8E',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
 }))
app.use(cors());
app.use("/web", webRouter);

app.use('/Images',express.static('./Images'))
// app.use(express.static(path.join(__dirname, 'storage')));
module.exports = app;