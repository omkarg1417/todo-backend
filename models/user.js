const sequelize = require('../database/index');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    todos: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        defaultValue: []
    }
});

module.exports = User;