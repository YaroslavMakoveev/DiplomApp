require('dotenv').config();
const { TrialLesson } = require('../models/models');

class TrialLessonController {
    async createTrialLesson(req, res) {
        const { name, phone, email, age } = req.body;
        try {
            if (!name || !phone || !email || !age) {
                return res.status(400).json({ message: 'Все поля должны быть заполнены!' });
            }

            // Проверка уникальности телефона и почты
            const existingTrialLessonByPhone = await TrialLesson.findOne({ where: { phone } });
            const existingTrialLessonByEmail = await TrialLesson.findOne({ where: { email } });

            if (existingTrialLessonByPhone || existingTrialLessonByEmail) {
                return res.status(400).json({ message: 'Заявка с таким телефоном или почтой уже существует.' });
            }

            const trialLesson = await TrialLesson.create({
                name,
                phone,
                email,
                age,
            });

            return res.status(201).json({ message: 'Вы успешно записались на пробное занятие!', trialLesson });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new TrialLessonController();
