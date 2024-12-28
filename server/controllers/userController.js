// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const ejs = require('ejs');
// const path = require('path');
// const { Users } = require('../models/models');

// const generadeJwt = (id, email, role) => {
//     return jwt.sign(
//         { id, email, role },
//         process.env.SECRET_KEY,
//         { expiresIn: '24h' }
//     );
// };

// // Настройка транспортера nodemailer для Mail.ru
// let transporter = nodemailer.createTransport({
//     host: 'smtp.mail.ru',
//     port: 465,
//     secure: true, // использовать SSL
//     auth: {
//         user: process.env.EMAIL_USER, // Ваш email
//         pass: process.env.EMAIL_PASS // Ваш пароль
//     }
// });

// class UserController {
//     async registration(req, res) {
//         const { name, surname, patronymic, email, phone, password, role } = req.body;
//         const img = req.file ? req.file.filename : 'default.png';
//         try {
//             const existingUserByEmail = await Users.findOne({ where: { email } });
//             if (existingUserByEmail) {
//                 return res.status(403).json({ message: 'Пользователь с таким email уже зарегистрирован' });
//             }
//             const existingUserByPhone = await Users.findOne({ where: { phone } });
//             if (existingUserByPhone) {
//                 return res.status(403).json({ message: 'Пользователь с таким номером телефона уже зарегистрирован' });
//             }
//             const hashedPassword = await bcrypt.hash(password, 5);
//             const user = await Users.create({
//                 name,
//                 surname,
//                 patronymic,
//                 img,
//                 email,
//                 phone,
//                 password: hashedPassword,
//                 role
//             });
//             const token = generadeJwt(user.id, user.email, user.role);

//             // Отправка email
//             const templatePath = path.join(__dirname, '../emailTemplates/registration.html');
//             ejs.renderFile(templatePath, { email: user.email, password: password }, (err, html) => {
//                 if (err) {
//                     console.log('Ошибка рендеринга шаблона:', err);
//                     return res.status(500).json({ message: 'Ошибка сервера' });
//                 }

//                 let mailOptions = {
//                     from: process.env.EMAIL_USER,
//                     to: user.email,
//                     subject: 'Успешная регистрация',
//                     html: html
//                 };

//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log('Ошибка отправки сообщения:', error);
//                     } else {
//                         console.log('Сообщение отправлено:', info.response);
//                     }
//                 });
//             });

//             return res.status(200).json({ message: 'Пользователь успешно зарегистрирован!', user, token });
//         } catch (e) {
//             console.log(e);
//             return res.status(500).json({ message: 'Ошибка сервера' });
//         }
//     }

//     async login(req, res) {
//         const { email, phone, password } = req.body;
//         let user;
//         try {
//             if (email) {
//                 user = await Users.findOne({ where: { email } });
//             } else if (phone) {
//                 user = await Users.findOne({ where: { phone } });
//             } else if (!user) {
//                 return res.status(404).json({ message: 'Пользователь с такими данными не зарегистрирован!' });
//             }
//             if (!user) {
//                 return res.status(404).json({ message: 'Пользователь с такими данными не зарегистрирован' });
//             }
//             const comparePassword = await bcrypt.compare(password, user.password);
//             if (!comparePassword) {
//                 return res.status(403).json({ message: 'Неверный пароль' });
//             }
//             const token = generadeJwt(user.id, user.email, user.role);
//             return res.status(200).json({ message: 'Пользователь успешно авторизован', user, token });
//         } catch (e) {
//             console.log(e);
//             return res.status(500).json({ message: 'Ошибка сервера' });
//         }
//     }

//     async check(req, res) {
//         const token = generadeJwt(req.user.id, req.user.email, req.user.role);
//         const user = await Users.findOne({ where: { id: req.user.id } });
//         return res.json({ token, user });
//     }
// }

// module.exports = new UserController();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { Users } = require('../models/models');

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
}

module.exports = new UserController();
