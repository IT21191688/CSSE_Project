//create varables and import pacages
const dotenv = require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const googleAuth = require('./google.auth');
const passport = require('passport');
var session = require('express-session');
const authRoutes = require('./routes/user.route');
const { routsInit } = require('./controller/auth.google')
const MongoStore = require('connect-mongo');
const { config } = require("dotenv");
const path = require('path');


//import .env
require("dotenv").config();

//initialize port number
const PORT = process.env.PORT || 8082;

//use dependancies
app.use(cors());
//get json using bodyparser
app.use(bodyParser.json());

//connect mongo db options
const URI = process.env.MONGODB_URL;


//auth
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, store: MongoStore.create({ mongoUrl: URI }), cookie: { secure: false, expires: new Date(Date.now() + 50000) }, maxAge: 10000 }));
app.use(passport.initialize());
app.use(passport.session());


//    1.20

mongoose.connect(URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {

    console.log('Connected to MongoDB!!!');

    app.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`);
        routsInit(app, passport)
        googleAuth(passport)



    });
}).catch((error) => {
    console.log("Error Connecting MongoDb", error);
});

app.get('/getip', (req, res) => {
    const clientIP = req.ip; // This retrieves the client's IP address
    res.send({ ip: clientIP });
});


const db = mongoose.connection;

app.use('/auth', authRoutes);
