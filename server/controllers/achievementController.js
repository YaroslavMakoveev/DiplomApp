const { Achievements } = require('../models/models');

class AchievementController {
    async createAchievement(req, res) {
        const { userId, competitionName, place, weightCategory } = req.body;
        try {
            const achievement = await Achievements.create({
                userId,
                competitionName,
                place,
                weightCategory,
                date: new Date()
            });
            return res.status(200).json({ message: 'Достижение успешно добавлено', achievement });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getAchievementsByUser(req, res) {
        const { userId } = req.params;
        try {
            const achievements = await Achievements.findAll({ where: { userId } });
            return res.status(200).json(achievements);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async deleteAchievement(req, res) {
        const { id } = req.params;
        try {
            const achievement = await Achievements.findOne({ where: { id } });
            if (!achievement) {
                return res.status(404).json({ message: 'Достижение не найдено' });
            }
            await achievement.destroy();
            return res.status(200).json({ message: 'Достижение успешно удалено' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new AchievementController();
