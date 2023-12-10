const bcrypt = require('bcrypt');
const { Op, Sequelize, } = require("sequelize")
const message = require("../constants/messages")

const db = require("../models/index")
const UserModel = db.UserModel
const EducationModel = db.EducationModel
const ExperienceModel = db.ExperienceModel
const ProjectsModel = db.ProjectsModel
const SkillsModel = db.SkillsModel

const webProfileController = async (req, res) => {
    try {
        const globalQuery = {
            isActive: true,
            isDeleted: false,
        }
        const globalAttributes = ["createdByUserId", "createdAt", "updatedAt"]

        const targetMainUser = await UserModel.findAll({
            where: {
                [Op.or]: [
                    { email: process.env.MAIN_USER_EMAIL },
                    { mobile: process.env.MAIN_USER_PHONE }
                ],
            },
            attributes: ["userId"],
            include: [
                {
                    model: EducationModel,
                    where: globalQuery,
                    order: [
                        ['startYear', 'DESC'],
                        ['startMonth', 'DESC'],
                    ],
                    attributes: { exclude: globalAttributes },
                    required: false
                },
                {
                    model: ExperienceModel,
                    where: globalQuery,
                    order: [
                        ['startYear', 'DESC'],
                        ['startMonth', 'DESC'],
                    ],
                    attributes: { exclude: globalAttributes },
                    required: false
                },
                {
                    model: ProjectsModel,
                    where: globalQuery,
                    order: [
                        ['startYear', 'DESC'],
                        ['startMonth', 'DESC'],
                    ],
                    attributes: { exclude: globalAttributes },
                    required: false
                },
                {
                    model: SkillsModel,
                    where: globalQuery,
                    attributes: { exclude: globalAttributes },
                    required: false
                },
            ],
        })

        const transformModelData = (result, item, modelName) => {
            const userId = item.userId;

            if (!result[userId]) {
                result[userId] = {
                    userId: item.userId,
                    Education: [],
                    Experiences: [],
                    Projects: [],
                    Skills: []
                };
            }
            const modelData = item[modelName] ? item[modelName].map(instance => instance.dataValues) : [];

            result[userId][modelName] = modelData;

            return result;
        };

        const transformedData = targetMainUser.reduce((result, item) => {
            result = transformModelData(result, item, 'Education');
            result = transformModelData(result, item, 'Experiences');
            result = transformModelData(result, item, 'Projects');
            result = transformModelData(result, item, 'Skills');

            return result;
        }, {});

        const finalResult = Object.values(transformedData);

        return res.status(200).send({
            status: true,
            data: finalResult
        })
    } catch (error) {
        console.log(`\x1b[91m ${error} \x1b[91m`)
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
module.exports = {
    webProfileController
}