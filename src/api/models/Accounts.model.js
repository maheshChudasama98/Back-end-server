module.exports = (sequelize, DataTypes) => {
    const ModelTable = sequelize.define('Accounts', {
        accountId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        accountTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startBalance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        currentBalance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        password: {
            type: DataTypes.STRING(2000),
        },
        activePassword: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
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
        modelName: 'Accounts',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return ModelTable
}