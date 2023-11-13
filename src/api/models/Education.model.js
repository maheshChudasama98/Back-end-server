require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const ModelTable = sequelize.define('Education', {
        educationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        degreeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        institute: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        board: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endMonth: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdByUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        },
    }, {
        modelName: 'Education',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return ModelTable
}