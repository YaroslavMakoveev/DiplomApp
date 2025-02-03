const { Group, TrainingSchedule, UserGroup, Users } = require('../models/models');
const { Op } = require('sequelize');

class ScheduleController {
    async createGroup(req, res) {
        const { name } = req.body;
        try {
            const group = await Group.create({ name });
            return res.status(201).json(group);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async getAllGroups(req, res) {
        try {
            const groups = await Group.findAll();
            return res.status(200).json(groups);
        } catch (e) {
            console.error('Error fetching groups:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async addTraining(req, res) {
        const { groupId, dayOfWeek, startTime, endTime } = req.body;
        try {
            // Проверяем, есть ли уже тренировка в это время
            const existingTraining = await TrainingSchedule.findOne({
                where: {
                    groupId,
                    dayOfWeek,
                    [Op.or]: [
                        {
                            startTime: { [Op.between]: [startTime, endTime] },
                        },
                        {
                            endTime: { [Op.between]: [startTime, endTime] },
                        },
                    ],
                },
            });
    
            if (existingTraining) {
                return res.status(400).json({ message: 'Тренировка в это время уже существует' });
            }
    
            const training = await TrainingSchedule.create({ groupId, dayOfWeek, startTime, endTime });
            return res.status(201).json(training);
        } catch (e) {
            console.error('Error adding training:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async addUserToGroup(req, res) {
        const { userId, groupId } = req.body;
        try {
            // Проверяем, не состоит ли уже спортсмен в группе
            const existingUserGroup = await UserGroup.findOne({ where: { userId, groupId } });
            if (existingUserGroup) {
                return res.status(400).json({ message: 'Спортсмен уже состоит в этой группе' });
            }
            const userGroup = await UserGroup.create({ userId, groupId });
            return res.status(201).json(userGroup);
        } catch (e) {
            console.error('Error adding user to group:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async removeUserFromGroup(req, res) {
        const { userId, groupId } = req.body;
        try {
            await UserGroup.destroy({ where: { userId, groupId } });
            return res.status(200).json({ message: 'Спортсмен удален из группы' });
        } catch (e) {
            console.error('Error removing user from group:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async getGroupMembers(req, res) {
        const { groupId } = req.params;
        try {
            const members = await UserGroup.findAll({
                where: { groupId },
                include: [{ model: Users, attributes: ['id', 'name', 'surname', 'patronymic', 'dateOfBirth'] }]
            });
            return res.status(200).json(members);
        } catch (e) {
            console.error('Error fetching group members:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }
    
    async getGroupSchedule(req, res) {
        const { groupId } = req.params;
        try {
            const schedule = await TrainingSchedule.findAll({ where: { groupId } });
            return res.status(200).json(schedule);
        } catch (e) {
            console.error('Error fetching schedule:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async getUserSchedule(req, res) {
        const { userId } = req.params;
        try {
            const userGroups = await UserGroup.findAll({ where: { userId } });
            const groupIds = userGroups.map(ug => ug.groupId);
            const schedule = await TrainingSchedule.findAll({ where: { groupId: groupIds } });
            return res.status(200).json(schedule);
        } catch (e) {
            console.error('Error fetching user schedule:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async deleteTraining(req, res) {
        const { id } = req.params;
        try {
            await TrainingSchedule.destroy({ where: { id } });
            return res.status(200).json({ message: 'Training deleted successfully' });
        } catch (e) {
            console.error('Error deleting training:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async deleteGroup(req, res) {
        const { id } = req.params;
        try {
            // Удаляем все тренировки группы
            await TrainingSchedule.destroy({ where: { groupId: id } });
            // Удаляем все записи о спортсменах в группе
            await UserGroup.destroy({ where: { groupId: id } });
            // Удаляем саму группу
            await Group.destroy({ where: { id } });
            return res.status(200).json({ message: 'Group deleted successfully' });
        } catch (e) {
            console.error('Error deleting group:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }

    async getGroupMembersCount(req, res) {
        const { groupId } = req.params;
        try {
            const count = await UserGroup.count({ where: { groupId } });
            return res.status(200).json({ count });
        } catch (e) {
            console.error('Error fetching group members count:', e);
            return res.status(500).json({ message: 'Server Error', error: e.message });
        }
    }
}

module.exports = new ScheduleController();