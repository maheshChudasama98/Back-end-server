const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const MESSAGE = require("../constants/messages")
const db = require("../models")

const UserModel = db.UserModel
const EducationModel = db.EducationModel

// ------------ || Education Create and Modify Api controller   || ------------ //
const educationModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        if (!payloadBody?.educationId) {
            await EducationModel.create(payloadBody).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.EDUCATION_CREATED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })

        } else {
            const query = {
                educationId: payloadBody?.educationId
            }
            const targetEducation = await EducationModel.findOne({
                where: query,
                raw: true
            })
            if (targetEducation?.educationId === payloadBody?.educationId) {

                await EducationModel.update(payloadBody, { where: { educationId: payloadBody?.educationId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.EDUCATION_UPDATED
                    })
                }).catch((error) => {

                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
                })

            }
        }

        // const duplicateEducation = await EducationModel.findOne({
        //     where: {
        //         [Op.and]: [
        //             { degreeName: payloadBody?.degreeName || "" },
        //             { institute: payloadBody?.institute || "" },
        //             { board: payloadBody?.board || "" },
        //             { startMonth: payloadBody?.startMonth || "" },
        //             { startYear: payloadBody?.startYear || "" },
        //             { endMonth: payloadBody?.endMonth || "" },
        //         ],
        //     },
        //     raw: true
        // });

        // if (!payloadBody?.userId) {
        //     payloadBody.password = bcrypt.hashSync(payloadBody.password, 10)
        //     payloadBody.createdAt = new Date
        //     payloadBody.updatedAt = new Date

        //     if (!findDuplicateUser?.userId) {
        //         await UserModel.create(payloadBody).then(() => {
        //             return res.status(200).send({
        //                 status: true,
        //                 message: message.USER_CREATED
        //             })
        //         }).catch((error) => {
        //             return res.status(200).send({
        //                 status: false,
        //                 message: error.message
        //             })
        //         })
        //     } else if (findDuplicateUser?.userId && findDuplicateUser.isDeleted == true) {
        //         payloadBody.isDeleted = false
        //         await UserModel.update(payloadBody, { where: { userId: findDuplicateUser.userId } }).then(() => {
        //             return res.status(200).send({
        //                 status: true,
        //                 message: message.USER_CREATED
        //             })
        //         }).catch((error) => {
        //             return res.status(200).send({
        //                 status: false,
        //                 message: error.message
        //             })
        //         })
        //     } else {
        //         return res.status(200).send({
        //             status: false,
        //             message: message.USER_ALREADY_REGISTERED
        //         })
        //     }
        // } else {
        //     if ((findDuplicateUser?.userId && findDuplicateUser.userId == payloadBody.userId && findDuplicateUser.isDeleted == false) || (!findDuplicateUser?.userId)) {
        //         payloadBody.updatedAt = new Date
        //         await UserModel.update(payloadBody, { where: { userId: payloadBody.userId } }).then(() => {
        //             return res.status(200).send({
        //                 status: true,
        //                 message: message.USER_UPDATE
        //             })
        //         }).catch((error) => {
        //             return res.status(200).send({
        //                 status: false,
        //                 message: error.message
        //             })
        //         })
        //     } else {
        //         return res.status(200).send({
        //             status: false,
        //             message: message.USER_ALREADY_REGISTERED
        //         })
        //     }
        // }

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Education as user list api controller   || ------------ //
const educationFetchListController = async (req, res) => {
    try {
        const payloadParam = req.user
        const query = {
            createdByUserId: payloadParam.userId,
            isDeleted: false
        }

        const educationList = await EducationModel.findAll({
            where: query,
            order: [
                ['startYear', 'DESC'],
                ['startMonth', 'DESC'],
            ],
            raw: true
        })
        return res.status(200).send({
            status: true,
            data: educationList,
            message: MESSAGE.SUCCESS
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Education Delete api controller   || ------------ //
const educationDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetEducation = await EducationModel.findOne({
            where: {
                isDeleted: false,
                educationId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetEducation?.educationId) {
            await EducationModel.update({
                isDeleted: true
            }, { where: { educationId: targetEducation.educationId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.EDUCATION_DELETED
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
                message: MESSAGE.ERROR
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
    educationModifyController,
    educationFetchListController,
    educationDeleteController
}

