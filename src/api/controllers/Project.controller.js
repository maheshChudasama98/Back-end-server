const { Op, Sequelize, } = require("sequelize")
const MESSAGE = require("../constants/messages")
const db = require("../models")
const ProjectsModel = db.ProjectsModel

// ------------ || Project Create and Modify Api controller   || ------------ //
const projectModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        if (!payloadBody?.projectId) {
            await ProjectsModel.create(payloadBody).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.PROJECT_CREATED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })

        } else {
            const query = {
                projectId: payloadBody?.projectId
            }
            const targetProject = await ProjectsModel.findOne({
                where: query,
                raw: true
            })
            if (targetProject?.projectId === payloadBody?.projectId) {
                await ProjectsModel.update(payloadBody, { where: { projectId: payloadBody?.projectId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.PROJECT_UPDATED
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

// ------------ || Project as user list api controller   || ------------ //
const projectFetchListController = async (req, res) => {
    try {
        const payloadParam = req.user
        const query = {
            createdByUserId: payloadParam.userId,
            isDeleted: false
        }

        const projectList = await ProjectsModel.findAll({
            where: query,
            order: [
                ['startYear', 'DESC'],
                ['startMonth', 'DESC'],
            ],
            raw: true
        })
        return res.status(200).send({
            status: true,
            data: projectList,
            message: MESSAGE.SUCCESS
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Project Delete api controller   || ------------ //
const projectDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetProject = await ProjectsModel.findOne({
            where: {
                isDeleted: false,
                projectId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetProject?.projectId) {
            await ProjectsModel.update({
                isDeleted: true,
                isActive: false,
            }, { where: { projectId: targetProject.projectId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.PROJECT_DELETED
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
    projectModifyController,
    projectFetchListController,
    projectDeleteController
}

