const { sequelize, DataTypes } = require('../../configs/Database.config')

const db = {}

// All modal include here  
db.UserTypesModel = require("./UserTypes.model")(sequelize, DataTypes)
db.UserModel = require("./Users.model")(sequelize, DataTypes)
db.EducationModel = require("./Education.model")(sequelize, DataTypes)
db.ExperienceModel = require("./Experience.model")(sequelize, DataTypes)
db.ProjectsModel = require("./Projects.model")(sequelize, DataTypes)
db.CompaniesModel = require("./Companies.model")(sequelize, DataTypes)
db.SkillsModel = require("./Skills.model")(sequelize, DataTypes)
db.CategoryModel = require("./Category.model")(sequelize, DataTypes)
db.TimeLogsModel = require("./TimeLogs.model")(sequelize, DataTypes)


// Join Models here 
db.UserTypesModel.hasOne(db.UserModel, { foreignKey: 'userTypeId' }); // one to one 
db.UserModel.belongsTo(db.UserTypesModel, { foreignKey: 'userTypeId' });

db.UserModel.hasMany(db.EducationModel, { foreignKey: 'createdByUserId' }); // one to many
db.EducationModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.ExperienceModel, { foreignKey: 'createdByUserId' }); // one to many
db.ExperienceModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.ProjectsModel, { foreignKey: 'createdByUserId' }); // one to many
db.ProjectsModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.CompaniesModel, { foreignKey: 'createdByUserId' }); // one to many
db.CompaniesModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.SkillsModel, { foreignKey: 'createdByUserId' }); // one to many
db.SkillsModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.CategoryModel.hasMany(db.TimeLogsModel, { foreignKey: 'categoryId' }); // one to many
db.TimeLogsModel.belongsTo(db.CategoryModel, { foreignKey: 'categoryId' });

db.UserModel.hasMany(db.TimeLogsModel, { foreignKey: 'createdByUserId' }); // one to many
db.TimeLogsModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.CategoryModel, { foreignKey: 'createdByUserId' }); // one to many
db.CategoryModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });


module.exports = db