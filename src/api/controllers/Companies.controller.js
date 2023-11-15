const MESSAGE = require("../constants/messages")
const db = require("../models")
const CompaniesModel = db.CompaniesModel

// ------------ || Company Create and Modify Api controller   || ------------ //
const companyModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        console.log("");
        if (!payloadBody?.companyId) {
            await CompaniesModel.create(payloadBody).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.COMPANY_CREATED
                })
            }).catch((error) => {
                console.log(`\x1b[91m ${error} \x1b[91m`)
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })

        } else {
            const query = {
                companyId: payloadBody?.companyId
            }
            const targetCompany = await CompaniesModel.findOne({
                where: query,
                raw: true
            })
            if (targetCompany?.companyId === payloadBody?.companyId) {
                await CompaniesModel.update(payloadBody, { where: { companyId: payloadBody?.companyId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.COMPANY_UPDATED
                    })
                }).catch((error) => {
                    console.log(`\x1b[91m ${error} \x1b[91m`)
                    return res.status(200).send({
                        status: false,
                        message: error.message
                    })
                })
            }
        }
    } catch (error) {
        console.log(`\x1b[91m ${error} \x1b[91m`)
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Company as user list api controller   || ------------ //
const companyFetchListController = async (req, res) => {
    try {
        const payloadParam = req.user
        const query = {
            createdByUserId: payloadParam.userId,
            isDeleted: false
        }

        const companyList = await CompaniesModel.findAll({
            where: query,
            order: [
                ['startYear', 'DESC'],
            ],
            raw: true
        })

        return res.status(200).send({
            status: true,
            data: companyList,
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

// ------------ || Company Delete api controller   || ------------ //
const companyDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetCompany = await CompaniesModel.findOne({
            where: {
                isDeleted: false,
                companyId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetCompany?.companyId) {
            await CompaniesModel.update({
                isDeleted: true,
                isActive: false,
            }, { where: { companyId: targetCompany.companyId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.COMPANY_DELETED
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
    companyModifyController,
    companyFetchListController,
    companyDeleteController
}

