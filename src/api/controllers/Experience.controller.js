const { Op, Sequelize, } = require("sequelize")
const bcrypt = require('bcrypt');
const MESSAGE = require("../constants/messages")
const db = require("../models")

const UserModel = db.UserModel
const ExperienceModel = db.ExperienceModel

// ------------ || Education Create and Modify Api controller   || ------------ //
const experienceModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        if (!payloadBody?.experienceId) {
            await ExperienceModel.create(payloadBody).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.EXPERIENCE_CREATED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })

        } else {
            const query = {
                experienceId: payloadBody?.experienceId
            }
            const targetExperience = await ExperienceModel.findOne({
                where: query,
                raw: true
            })
            if (targetExperience?.experienceId === payloadBody?.experienceId) {

                await ExperienceModel.update(payloadBody, { where: { experienceId: payloadBody?.experienceId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.EXPERIENCE_UPDATED
                    })
                }).catch((error) => {

                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
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

// ------------ || Education as user list api controller   || ------------ //
const experienceFetchListController = async (req, res) => {
    try {
        const payloadParam = req.user
        const query = {
            createdByUserId: payloadParam.userId,
            isDeleted: false
        }

        const educationList = await ExperienceModel.findAll({
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
const experienceDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetExperience = await ExperienceModel.findOne({
            where: {
                isDeleted: false,
                experienceId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetExperience?.experienceId) {
            await ExperienceModel.update({
                isDeleted: true,
                isActive: false,
            }, { where: { experienceId: targetExperience.experienceId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.EXPERIENCE_DELETED
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
    experienceModifyController,
    experienceFetchListController,
    experienceDeleteController
}

