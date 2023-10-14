const { sequelize, DataTypes } = require('../../configs/Database.config')

const db = {}

// All modal include here  
db.UserTypesModel = require("./UserTypes.model")(sequelize, DataTypes)
db.AccountTypesModel = require("./AccountTypes.model")(sequelize, DataTypes)

db.UserModel = require("./Users.model")(sequelize, DataTypes)
db.AccountsModel = require("./Accounts.model")(sequelize, DataTypes)

// Join Models here
db.UserTypesModel.hasOne(db.UserModel, { foreignKey: 'userTypeId' });
db.UserModel.belongsTo(db.UserTypesModel, { foreignKey: 'userTypeId' });

db.AccountTypesModel.hasOne(db.AccountsModel, { foreignKey: 'accountTypeId'});
db.AccountsModel.belongsTo(db.AccountTypesModel, { foreignKey: 'accountTypeId'});

db.UserModel.hasOne(db.AccountsModel, { foreignKey: 'userId'});
db.AccountsModel.belongsTo(db.UserModel, { foreignKey: 'userId'});

module.exports = db