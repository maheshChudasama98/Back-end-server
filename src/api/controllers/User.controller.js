const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const message = require("../constants/messages")
const db = require("../models/index")

const UserModel = db.UserModel

// ------------ || User Create and Modify Api controller   || ------------ //
const userModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const findDuplicateUser = await UserModel.findOne({
            where: {
                [Op.or]: [
                    { email: payloadBody?.email || "" },
                    { mobile: payloadBody?.mobile || "" }
                ],
            },
            raw: true
        });

        if (!payloadBody?.userId) {
            payloadBody.password = bcrypt.hashSync(payloadBody.password, 10)
            payloadBody.createdAt = new Date
            payloadBody.updatedAt = new Date

            if (!findDuplicateUser?.userId) {
                await UserModel.create(payloadBody).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: message.USER_CREATED
                    })
                }).catch((error) => {
                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
                })
            } else if (findDuplicateUser?.userId && findDuplicateUser.isDeleted == true) {
                payloadBody.isDeleted = false
                await UserModel.update(payloadBody, { where: { userId: findDuplicateUser.userId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: message.USER_CREATED
                    })
                }).catch((error) => {
                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
                })
            } else {
                return res.status(200).send({
                    status: false,
                    message: message.USER_ALREADY_REGISTERED
                })
            }
        } else {
            if ((findDuplicateUser?.userId && findDuplicateUser.userId == payloadBody.userId && findDuplicateUser.isDeleted == false) || (!findDuplicateUser?.userId)) {
                payloadBody.updatedAt = new Date
                await UserModel.update(payloadBody, { where: { userId: payloadBody.userId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: message.USER_UPDATE
                    })
                }).catch((error) => {
                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
                })
            } else {
                return res.status(200).send({
                    status: false,
                    message: message.USER_ALREADY_REGISTERED
                })
            }
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || User Delete api controller   || ------------ //
const userDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const targetUser = await UserModel.findOne({
            where: {
                userId: payloadParam.id,
                isDeleted: false
            },
            raw: true
        })
        if (targetUser?.userId) {
            await UserModel.update({
                isDeleted: true
            }, { where: { userId: targetUser.userId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: message.USER_DELETED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
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
    userModifyController,
    userDeleteController
}

