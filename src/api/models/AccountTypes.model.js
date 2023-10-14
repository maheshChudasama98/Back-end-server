module.exports = (sequelize, DataTypes) => {
    const modelTable = sequelize.define('AccountTypes', {
        accountTypeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        typeName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

    }, {
        modelName: 'AccountTypes',
        initialAutoIncrement: 1,
        timestamps: false,
    });
    return modelTable
}