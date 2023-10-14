const { Op, Sequelize, } = require("sequelize")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../Models")
const secureKey = process.env.TOKEN_SECURE_KEY
const message = require("../constants/messages")
const UserModel = db.UserModel
const UserTypesModel = db.UserTypesModel
// ------------ || Login Controller   || ------------ //
const loginController = async (req, res) => {
    try {
        const payloadBody = req.body
        const targetUser = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { email: payloadBody?.email || "" },
                    { mobile: payloadBody?.mobile || "" }
                ],
                isActive : true
            },
            include: [{
                model: UserTypesModel
            }]
        })
        if (targetUser?.userId) {
            await bcrypt.compare(payloadBody.password, targetUser.password, function (err, result) {
                if (result) {
                    const tokenPassObj = {
                        userId: targetUser.userId,
                        firstName: targetUser.firstName,
                        email: targetUser.email,
                        mobile: targetUser.mobile,
                        createdAt: targetUser.createdAt,
                    }
                    let userData = {
                        userId: targetUser.userId,
                        firstName: targetUser.firstName,
                        lastName: targetUser.lastName,
                        email: targetUser.email,
                        mobile: targetUser.mobile,
                        themeColor: targetUser.themeColor,
                        role: targetUser.UserType.typeName,
                        roleId: targetUser.UserType.userTypeId
                    }
                    jwt.sign(tokenPassObj, secureKey, { expiresIn: '24h' }, function (err, token) {

                        return res.status(200).send({
                            status: true,
                            token: token,
                            data: userData,
                            message: message.LOGIN_SUCCESS
                        })
                    });
                }
                else {
                    return res.status(200).send({
                        status: false,
                        message: message.PASSWORD_NOT_VALID
                    })
                }
            })

        } else {
            return res.status(200).send({
                status: false,
                message: message.USER_NOT_VALID
            })
        }

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    loginController
}