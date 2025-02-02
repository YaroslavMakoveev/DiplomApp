const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const News = sequelize.define('News', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    publishedDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    img: { type: DataTypes.STRING, allowNull: true }
});

const Achievements = sequelize.define('Achievements', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    competitionName: { type: DataTypes.STRING, allowNull: false },
    place: { type: DataTypes.INTEGER, allowNull: false },
    weightCategory: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.STRING, allowNull: false },
    weightCategory: { type: DataTypes.STRING, allowNull: false },
    discharge: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Нет' },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: 'default.png' },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' },
    resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
    resetPasswordExpires: { type: DataTypes.DATE, allowNull: true }
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

const Group = sequelize.define('Group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

const TrainingSchedule = sequelize.define('TrainingSchedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    groupId: { type: DataTypes.INTEGER, allowNull: false },
    dayOfWeek: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false }
});

const UserGroup = sequelize.define('UserGroup', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    groupId: { type: DataTypes.INTEGER, allowNull: false }
});

// Связи между моделями
Group.hasMany(TrainingSchedule, { foreignKey: 'groupId' });
TrainingSchedule.belongsTo(Group, { foreignKey: 'groupId' });
Group.belongsToMany(Users, { through: UserGroup, foreignKey: 'groupId' });
Users.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
UserGroup.belongsTo(Users, { foreignKey: 'userId' });
UserGroup.belongsTo(Group, { foreignKey: 'groupId' });
Users.hasMany(Achievements, { foreignKey: 'userId' });
Achievements.belongsTo(Users, { foreignKey: 'userId' });

module.exports = {
    Users,
    TrialLesson,
    News,
    Group,
    TrainingSchedule,
    UserGroup,
    Achievements
};
