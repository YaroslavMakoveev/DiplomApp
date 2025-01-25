require('dotenv').config();
const { TrialLesson } = require('../models/models');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const moment = require('moment');
require('moment/locale/ru'); // Подключаем русскую локаль

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

class TrialLessonController {
    async createTrialLesson(req, res) {
        const { name, phone, email, age } = req.body;
        try {
            if (!name || !phone || !email || !age) {
                return res.status(400).json({ message: 'Все поля должны быть заполнены!' });
            }

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

    async getTrialLessons(req, res) {
        try {
            const trialLessons = await TrialLesson.findAll();
            return res.status(200).json(trialLessons);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async confirmTrialLesson(req, res) {
        const { id, confirmDateTime } = req.body;
        try {
            const trialLesson = await TrialLesson.findOne({ where: { id } });
            if (!trialLesson) {
                return res.status(404).json({ message: 'Заявка не найдена' });
            }

            // Устанавливаем русскую локаль
            moment.locale('ru');
            const formattedDateTime = moment(confirmDateTime).format('DD MMMM YYYY [в] HH:mm');
            trialLesson.message = `Подтверждено на ${formattedDateTime}`;
            trialLesson.status = 'Подтверждена';
            await trialLesson.save();

            const templatePath = path.join(__dirname, '../emailTemplates/confirmTrialLesson.html');
            const templateData = { name: trialLesson.name, confirmDateTime: formattedDateTime };

            ejs.renderFile(templatePath, templateData, (err, html) => {
                if (err) {
                    console.log('Ошибка рендеринга шаблона:', err);
                    return res.status(500).json({ message: 'Ошибка сервера' });
                }

                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: trialLesson.email,
                    subject: 'Подтверждение пробного занятия',
                    html: html
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Ошибка отправки сообщения:', error);
                    } else {
                        console.log('Сообщение отправлено:', info.response);
                    }
                });
            });

            return res.status(200).json({ message: 'Заявка подтверждена' });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async cancelTrialLesson(req, res) {
        const { id, cancelReason } = req.body;
        try {
            const trialLesson = await TrialLesson.findOne({ where: { id } });
            if (!trialLesson) {
                return res.status(404).json({ message: 'Заявка не найдена' });
            }

            trialLesson.message = `${cancelReason}`;
            trialLesson.status = 'Отклонена';
            await trialLesson.save();

            const templatePath = path.join(__dirname, '../emailTemplates/cancelTrialLesson.html');
            const templateData = { name: trialLesson.name, cancelReason };

            ejs.renderFile(templatePath, templateData, (err, html) => {
                if (err) {
                    console.log('Ошибка рендеринга шаблона:', err);
                    return res.status(500).json({ message: 'Ошибка сервера' });
                }

                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: trialLesson.email,
                    subject: 'Отмена пробного занятия',
                    html: html
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Ошибка отправки сообщения:', error);
                    } else {
                        console.log('Сообщение отправлено:', info.response);
                    }
                });
            });

            return res.status(200).json({ message: 'Заявка отменена' });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new TrialLessonController();
