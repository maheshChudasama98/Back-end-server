require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const ModelTable = sequelize.define('Skills', {
        skillId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        skillType: {
            type: DataTypes.ENUM,
            values: ['Technical', 'Soft', 'Language', 'Certificate'],
            allowNull: false,
        },
        skillName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagePath: {
            type: DataTypes.STRING(2000),
        },
        createdByUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'Skills',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return ModelTable
}