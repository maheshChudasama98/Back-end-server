require('dotenv').config(); // evn file Database details
const { Sequelize, DataTypes } = require('sequelize');

// ----- ||  Database Connection and Mysql  || ----- //
const sequelize = new Sequelize(
    process.env.DATABASE_COLLECTION,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        logging: false
    }
);

// ----- ||  Create for tables in Database  || ----- //
sequelize.authenticate().then(() => {
    sequelize.sync({ force: false });
    console.log("\x1b[92mDatabase connection has been established successfully.\x1b[39m");
}).catch((error) => {
    console.error(`\x1b[91mUnable to connect to the database: ${error} \x1b[91m`);
});

module.exports = { sequelize, Sequelize, DataTypes } 