require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const ModelTable = sequelize.define('Users', {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        mobile: {
            type: DataTypes.INTEGER,
            unique: true
        },
        password: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        userTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3,
        },
        imagePath: {
            type: DataTypes.STRING(2000),
        },
        authOpt: {
            type: DataTypes.INTEGER,
        },
        themeColor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: process.env.PROJECT_THEME_COLOR,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
    }, {
        modelName: 'Users',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return ModelTable
}