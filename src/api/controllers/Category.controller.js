const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const MESSAGE = require("../constants/messages")
const db = require("../models");

const CategoryModel = db.CategoryModel
const TimeLogsModel = db.TimeLogsModel

// ------------ || Category Create and Modify Api controller   || ------------ //
const categoryModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        const findDuplicateCategory = await CategoryModel.findOne({
            where: {
                categoryName: payloadBody?.categoryName,
            },
            raw: true
        });

        if (!payloadBody?.categoryId) {
            payloadBody.createdAt = new Date
            payloadBody.updatedAt = new Date

            if (!findDuplicateCategory?.categoryId) {
                await CategoryModel.create(payloadBody).then(() => {
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
                await CategoryModel.update(payloadBody, { where: { categoryId: findDuplicateCategory.categoryId } }).then(() => {
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
                await CategoryModel.update(payloadBody, { where: { categoryId: payloadBody.categoryId } }).then(() => {
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
                    message: MESSAGE.CATEGORY_DUPLICATE
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

// ------------ || Category as user list api controller   || ------------ //
const categoryFetchListController = async (req, res) => {
    try {
        const query = {
            isDeleted: false
        }
        const categoryList = await CategoryModel.findAll({
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

// ------------ || Category Delete api controller   || ------------ //
const categoryDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const findTimeLogCategory = await TimeLogsModel.findOne({
            where: {
                isDeleted: false,
                categoryId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (findTimeLogCategory?.timelogId) {
            return res.status(200).send({
                status: false,
                message: MESSAGE.CATEGORY_TIMELOG_ASSOCIATED
            })
        }
        const targetCategory = await CategoryModel.findOne({
            where: {
                isDeleted: false,
                categoryId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetCategory?.categoryId) {
            await CategoryModel.update({
                isDeleted: true
            }, { where: { categoryId: targetCategory.categoryId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.CATEGORY_DELETED
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
    categoryModifyController,
    categoryFetchListController,
    categoryDeleteController
}

