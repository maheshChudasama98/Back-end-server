const { sequelize, DataTypes } = require('../../configs/Database.config')

const db = {}

// All modal include here  
db.UserTypesModel = require("./UserTypes.model")(sequelize, DataTypes)
db.UserModel = require("./Users.model")(sequelize, DataTypes)


// Join Models here
db.UserTypesModel.hasOne(db.UserModel, { foreignKey: 'userTypeId' });
db.UserModel.belongsTo(db.UserTypesModel, { foreignKey: 'userTypeId' });

module.exports = db