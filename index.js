// ------------ ||  Express package  || ------------ //
require('dotenv').config(); // dotenv package need for access .env file

const express = require("express")
const app = express()
const port = process.env.PORT || 8090;
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(express.json()); // express in json data fetch for user 

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

require('./src/api/models/index') //  All Models and Database connection  
require('./src/api/routers/index')(app) // All Router index
// const BasicController = require("./src/api/controllers/Basic.controller")
// BasicController.PrimeDatabaseAction()

// ------------ ||  Server listen port  || ------------ //
app.listen(port, error => {
    error == null ?
        console.log(`\x1b[92mServer is running on port ${port}\x1b[39m `)
        : console.log("\x1b[91m Server error \x1b[91m", error)
})

