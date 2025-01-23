const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    weightCategory: { type: DataTypes.STRING, allowNull: false },
    discharge: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Нет' },
    dateOfBirth: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: 'default.png' },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

const TrialLesson = sequelize.define('TrialLesson', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Рассматривается' }
});

module.exports = {
    Users,
    TrialLesson
};
