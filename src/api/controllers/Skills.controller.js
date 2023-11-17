const MESSAGE = require("../constants/messages")
const db = require("../models")
const SkillsModel = db.SkillsModel

// ------------ || Skills create and Modify api controller   || ------------ //
const skillModifyController = async (req, res) => {
    try {
        const payloadBody = req.body
        const payloadUser = req.user
        payloadBody.createdByUserId = payloadUser.userId

        if (!payloadBody?.skillId) {
            await SkillsModel.create(payloadBody).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.SKILL_CREATED
                })
            }).catch((error) => {
                return res.status(200).send({
                    status: false,
                    message: error.message
                })
            })

        } else {
            const query = {
                skillId: payloadBody?.skillId
            }
            const targetSkill = await SkillsModel.findOne({
                where: query,
                raw: true
            })
            if (targetSkill?.skillId === payloadBody?.skillId) {
                await SkillsModel.update(payloadBody, { where: { skillId: payloadBody?.skillId } }).then(() => {
                    return res.status(200).send({
                        status: true,
                        message: MESSAGE.SKILL_UPDATED
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

// ------------ || Skills as user list api controller   || ------------ //
const skillFetchListController = async (req, res) => {
    try {
        const payloadParam = req.user
        const payloadBody = req.body
        const query = {
            skillType: payloadBody?.skillType,
            createdByUserId: payloadParam.userId,
            isDeleted: false
        }
        console.log(query);

        const skillList = await SkillsModel.findAll({
            where: query,
            // order: [
            //     ['startYear', 'DESC'],
            //     ['startMonth', 'DESC'],
            // ],
            raw: true
        })
        return res.status(200).send({
            status: true,
            data: skillList,
            message: MESSAGE.SUCCESS
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

// ------------ || Skills delete api controller   || ------------ //
const skillDeleteController = async (req, res) => {
    try {
        const payloadParam = req.params
        const payloadUser = req.user

        const targetSkill = await SkillsModel.findOne({
            where: {
                isDeleted: false,
                skillId: payloadParam.id,
                createdByUserId: payloadUser.userId,
            },
            raw: true
        })
        if (targetSkill?.skillId) {
            await SkillsModel.update({
                isDeleted: true,
                isActive: false,
            }, { where: { skillId: targetSkill.skillId } }).then(() => {
                return res.status(200).send({
                    status: true,
                    message: MESSAGE.SKILL_DELETED
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
    skillModifyController,
    skillFetchListController,
    skillDeleteController,
}

