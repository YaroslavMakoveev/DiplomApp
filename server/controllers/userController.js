require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { Users } = require('../models/models');
const crypto = require('crypto');
const { Op } = require('sequelize');

const generadeJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

// Настройка транспортера nodemailer для Mail.ru
let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // использовать SSL
    auth: {
        user: process.env.EMAIL_USER, // Ваш email
        pass: process.env.EMAIL_PASS // Ваш пароль
    }
});

class UserController {
    async registration(req, res) {
        const { name, surname, patronymic, email, phone, password, role } = req.body;
        const img = req.file ? req.file.filename : 'default.png';
        try {
            const existingUserByEmail = await Users.findOne({ where: { email } });
            if (existingUserByEmail) {
                return res.status(403).json({ message: 'Пользователь с таким email уже зарегистрирован' });
            }
            const existingUserByPhone = await Users.findOne({ where: { phone } });
            if (existingUserByPhone) {
                return res.status(403).json({ message: 'Пользователь с таким номером телефона уже зарегистрирован' });
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await Users.create({
                name,
                surname,
                patronymic,
                img,
                email,
                phone,
                password: hashedPassword,
                role
            });
            const token = generadeJwt(user.id, user.email, user.role);

            // Отправка email
            const templatePath = path.join(__dirname, '../emailTemplates/registration.html');
            const templateData = { email: user.email, password: password };

            console.log('Template Data:', templateData);
            console.log('Template Path:', templatePath);

            ejs.renderFile(templatePath, templateData, (err, html) => {
                if (err) {
                    console.log('Ошибка рендеринга шаблона:', err);
                    return res.status(500).json({ message: 'Ошибка сервера' });
                }

                console.log('Rendered HTML:', html);

                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Успешная регистрация',
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

            return res.status(200).json({ message: 'Пользователь успешно зарегистрирован!', user, token });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async login(req, res) {
        const { email, phone, password } = req.body;
        let user;
        try {
            if (email) {
                user = await Users.findOne({ where: { email } });
            } else if (phone) {
                user = await Users.findOne({ where: { phone } });
            } else if (!user) {
                return res.status(404).json({ message: 'Пользователь с такими данными не зарегистрирован!' });
            }
            if (!user) {
                return res.status(404).json({ message: 'Пользователь с такими данными не зарегистрирован' });
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(403).json({ message: 'Неверный пароль' });
            }
            const token = generadeJwt(user.id, user.email, user.role);

            // Отправка email
            const templatePath = path.join(__dirname, '../emailTemplates/login.html');

            console.log('Template Path:', templatePath);

            ejs.renderFile(templatePath, (err, html) => {
                if (err) {
                    console.log('Ошибка рендеринга шаблона:', err);
                    return res.status(500).json({ message: 'Ошибка сервера' });
                }

                console.log('Rendered HTML:', html);

                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Вы вошли в систему',
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

            return res.status(200).json({ message: 'Пользователь успешно авторизован', user, token });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async check(req, res) {
        const token = generadeJwt(req.user.id, req.user.email, req.user.role);
        const user = await Users.findOne({ where: { id: req.user.id } });
        return res.json({ token, user });
    }

    // Восстановление пароля
    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await Users.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь с таким email не найден' });
            }

            const token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 час
            await user.save();

            const templatePath = path.join(__dirname, '../emailTemplates/forgotPassword.html');
            const templateData = {
                email: user.email,
                resetUrl: `http://localhost:3001/reset-password/${token}`
            };

            ejs.renderFile(templatePath, templateData, (err, html) => {
                if (err) {
                    console.log('Ошибка рендеринга шаблона:', err);
                    return res.status(500).json({ message: 'Ошибка сервера' });
                }

                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Восстановление пароля',
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

            return res.status(200).json({ message: 'Инструкции по восстановлению пароля отправлены на ваш email' });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async resetPassword(req, res) {
        const { token, password } = req.body;
        try {
            const user = await Users.findOne({
                where: {
                    resetPasswordToken: token,
                    resetPasswordExpires: { [Op.gt]: Date.now() }
                }
            });

            if (!user) {
                return res.status(400).json({ message: 'Неверный или истекший токен' });
            }

            const hashedPassword = await bcrypt.hash(password, 5);
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();

            return res.status(200).json({ message: 'Пароль успешно изменен' });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // Редактирование профиля пользователя

    async updateProfile(req, res) {
        const { name, surname, patronymic } = req.body;
        const img = req.file ? req.file.filename : null;
        const userId = req.user.id;
    
        try {
            const user = await Users.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            user.name = name || user.name;
            user.surname = surname || user.surname;
            user.patronymic = patronymic || user.patronymic;
            if (img) {
                user.img = img;
            }
    
            await user.save();
    
            return res.status(200).json({ message: 'Профиль успешно обновлен', user });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new UserController();
