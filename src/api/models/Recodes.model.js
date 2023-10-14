require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const ModelTable = sequelize.define('Recodes', {
        recodeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        recodeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recodeNotes: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            defaultValue: 0,
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
        modelName: 'Recodes',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return ModelTable
}