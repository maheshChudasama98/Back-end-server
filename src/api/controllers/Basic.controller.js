const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const db = require("../models/index")

const UserTypesModel = db.UserTypesModel
const UserModel = db.UserModel

const PrimeDatabaseAction = async () => {
    const userTypeData = [
        { userTypeId: 1, typeName: "SuperAdmin" },
        { userTypeId: 2, typeName: "Admin" },
        { userTypeId: 3, typeName: "User" }]

    userTypeData.map(async (item) => {
        await UserTypesModel.findOne({ where: { typeName: item.typeName }, raw: true }).then(async (res) => {
            if (res === null) {
                await UserTypesModel.create(item).then((resRole) => { }).catch((error) => {
                    console.log(`\x1b[91m ${error} \x1b[91m`)
                })
            } else {
                
            }
        })
    })
}
const SuperAdminDatabaseAction = async () => {
    const plaintextPassword = 'admin@123';
    const saltRounds = 10;
    const adminUser = {
        userTypeId: 1,
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        mobile: 52525252,
    }
    await bcrypt.hash(plaintextPassword, saltRounds, async (err, hash) => {
        if (err) {
            console.error(err);
        } else {
            await UserModel.findOne({ where: adminUser }).then(async (res) => {
                if (res === null) {
                    adminUser.password = hash
                    adminUser.createdAt = new Date
                    adminUser.updatedAt = new Date
                    await UserModel.create(adminUser).then(() => { }).catch((error) => {
                        console.log(`\x1b[91m ${error.message} \x1b[91m`)
                    })
                }
            })
        }
    });
}

module.exports = {
    PrimeDatabaseAction,
    SuperAdminDatabaseAction
}