const { sequelize, DataTypes } = require('../../configs/Database.config')

const db = {}

// All modal include here  
db.UserTypesModel = require("./UserTypes.model")(sequelize, DataTypes)
db.UserModel = require("./Users.model")(sequelize, DataTypes)
db.EducationModel = require("./Education.model")(sequelize, DataTypes)
db.ExperienceModel = require("./Experience.model")(sequelize, DataTypes)
db.ProjectsModel = require("./Projects.model")(sequelize, DataTypes)


// Join Models here 
db.UserTypesModel.hasOne(db.UserModel, { foreignKey: 'userTypeId' }); // one to one 
db.UserModel.belongsTo(db.UserTypesModel, { foreignKey: 'userTypeId' });

db.UserModel.hasMany(db.EducationModel, { foreignKey: 'createdByUserId' }); // one to many
db.EducationModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.ExperienceModel, { foreignKey: 'createdByUserId' }); // one to many
db.ExperienceModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });

db.UserModel.hasMany(db.ProjectsModel, { foreignKey: 'createdByUserId' }); // one to many
db.ProjectsModel.belongsTo(db.UserModel, { foreignKey: 'createdByUserId' });


module.exports = db