const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const MESSAGE = require("../constants/messages")
const db = require("../models");

const TimeLogsModel = db.TimeLogsModel
const CategoryModel = db.CategoryModel

// ------------ || Timelogs Create and Modify Api controller   || ------------ //
const timelogModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        const findDuplicateCategory = await TimeLogsModel.findOne({
            where: {
                categoryName: payloadBody?.categoryName,
            },
            raw: true
        });

        if (!payloadBody?.categoryId) {
            payloadBody.createdAt = new Date
            payloadBody.updatedAt = new Date

            if (!findDuplicateCategory?.categoryId) {
                await TimeLogsModel.create(payloadBody).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.CATEGORY_CREATED
                    })
                }).catch((error) => {
                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
                })
            } else if (findDuplicateCategory?.categoryId && findDuplicateCategory.isDeleted == true) {
                payloadBody.isDeleted = false
                await TimeLogsModel.update(payloadBody, { where: { categoryId: findDuplicateCategory.categoryId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.USER_CREATED
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
                    message: MESSAGE.CATEGORY_DUPLICATE
                })
            }
        } else {
            if ((findDuplicateCategory?.categoryId && findDuplicateCategory.categoryId == payloadBody.categoryId && findDuplicateCategory.isDeleted == false) || (!findDuplicateCategory?.categoryId)) {

                const payloadUser = req.user
                payloadBody.createdByUserId = payloadUser.userId

                payloadBody.updatedAt = new Date
                await TimeLogsModel.update(payloadBody, { where: { categoryId: payloadBody.categoryId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.CATEGORY_UPDATED
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
                    message: messages.CATEGORY_DUPLICATE
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

// ------------ || Timelogs as user list api controller   || ------------ //
const timelogFetchListController = async (req, res) => {
    try {
        const query = {
            isDeleted: false
        }
        console.log("categoryName");

        const categoryList = await TimeLogsModel.findAll({
            where: query,
            order: [
                ['categoryName', 'ASC']
            ],
            raw: true
        })
        return res.status(200).send({
            status: true,
            data: categoryList,
            message: MESSAGE.SUCCESS
        })

    } catch (error) {
        console.log(`\x1b[91m ${error} \x1b[91m`)
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Timelogs Delete api controller   || ------------ //
const timelogDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetCategory = await TimeLogsModel.findOne({
            where: {
                isDeleted: false,
                categoryId: payloadParam.id,
                createdByUserId: payloadUser.categoryId,
            },
            raw: true
        })
        if (targetCategory?.categoryId) {
            await TimeLogsModel.update({
                isDeleted: true
            }, { where: { categoryId: targetCategory.categoryId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.EDUCATION_DELETED
                })
            }).catch((error) => {
                console.log(`\x1b[91m ${error} \x1b[91m`)
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
        console.log(`\x1b[91m ${error} \x1b[91m`)
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    timelogModifyController,
    timelogFetchListController,
    timelogDeleteController
}

