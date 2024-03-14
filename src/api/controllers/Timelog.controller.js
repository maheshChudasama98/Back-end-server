const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const MESSAGE = require("../constants/messages")
const db = require("../models");
const moment = require("moment");

const TimeLogsModel = db.TimeLogsModel
const CategoryModel = db.CategoryModel

// ------------ || Timelog Create and Modify Api controller   || ------------ //
const timelogModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId


        payloadBody.createdAt = new Date
        payloadBody.updatedAt = new Date

        if (!payloadBody?.timelogId) {

            await TimeLogsModel.create(payloadBody).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.TIMELOG_CREATED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })
        } else {
            await TimeLogsModel.update(payloadBody, { where: { timelogId: payloadBody.timelogId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.TIMELOG_UPDATED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Timelog as user list api controller   || ------------ //
const timelogFetchListController = async (req, res) => {
    try {
        const bodyParser = req.body
        const query = {
            isDeleted: false,
        }
        if (bodyParser?.start && bodyParser?.end) {
            query.startTime = {
                [Op.and]: [
                    { [Op.between]: [moment(bodyParser.start, 'DD/MM/YYYY').startOf('day').toDate(), moment(bodyParser.end, 'DD/MM/YYYY').endOf('day').toDate()] },
                    { [Op.between]: [moment(bodyParser.start, 'DD/MM/YYYY').startOf('day').toDate(), moment(bodyParser.end, 'DD/MM/YYYY').endOf('day').toDate()] }
                ]
            };
        }
        if (bodyParser?.category) {
            query.categoryId = {
                [Op.or]: bodyParser?.category
            };
        }
        const timeLogList = await TimeLogsModel.findAll({
            where: query,
            include: [
                {
                    model: CategoryModel,
                    attributes: ['categoryName', 'categoryColor', 'categoryIcon'],
                },
            ],
            attributes: ['timelogId', 'categoryId', 'startTime', 'endTime', 'totalTime', 'details'],
            order: [
                ['startTime', 'DESC'],
                ['timelogId', 'ASC'],
            ],
        })
        return res.status(200).send({
            status: true,
            data: timeLogList,
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

// ------------ || Timelog Delete api controller   || ------------ //
const timelogDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetTimelog = await TimeLogsModel.findOne({
            where: {
                isDeleted: false,
                timelogId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetTimelog?.timelogId) {
            await TimeLogsModel.update({
                isDeleted: true
            }, { where: { timelogId: targetTimelog.timelogId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.TIMELOG_DELETED
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

