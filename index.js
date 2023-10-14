// ------------ ||  Express package  || ------------ //

const express = require("express")
const app = express()
const port = process.env.PORT || 9090;

require('dotenv').config(); // dotenv package need for access .env file
app.use(express.json()); // express in json data fetch for user 

require('./src/api/models/index') //  All Models and Database connection  
require('./src/api/routers/index')(app) // All Router index
const BasicController = require("./src/api/controllers/Basic.controller")
BasicController.PrimeDatabaseAction()

// ------------ ||  Server listen port  || ------------ //
app.listen(port, (error) => {
    error == null ?
        console.log(`\x1b[92mServer is running on port ${port}\x1b[39m `)
        : console.log("\x1b[91m Server error \x1b[91m", error)
})

