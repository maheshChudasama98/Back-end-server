const { sequelize, DataTypes } = require('../../configs/Database.config')

const db = {}

// All modal include here  
db.UserTypesModel = require("./UserTypes.model")(sequelize, DataTypes)
db.UserModel = require("./Users.model")(sequelize, DataTypes)

db.EducationModel = require("./Education.model")(sequelize, DataTypes)
db.ExperienceModel = require("./Experience.model")(sequelize, DataTypes)


// Join Models here
db.UserTypesModel.hasOne(db.UserModel, { foreignKey: 'userTypeId' });
db.UserModel.belongsTo(db.UserTypesModel, { foreignKey: 'userTypeId' });

db.EducationModel.hasOne(db.UserModel, { foreignKey: 'createdByUserId' });
db.UserModel.belongsTo(db.EducationModel, { foreignKey: 'createdByUserId' });

db.ExperienceModel.hasOne(db.UserModel, { foreignKey: 'createdByUserId' });
db.UserModel.belongsTo(db.ExperienceModel, { foreignKey: 'createdByUserId' });

module.exports = db