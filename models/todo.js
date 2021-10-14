const {DataTypes} = require('sequelize');
const sequelize = require('../database/index');

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    }
});

module.exports = Todo;