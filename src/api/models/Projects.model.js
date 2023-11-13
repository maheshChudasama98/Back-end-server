require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const ModelTable = sequelize.define('Projects', {
        projectId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectRole: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        achievements: {
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
        description: {
            type: DataTypes.STRING(2000),
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Projects',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return ModelTable
}