require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Users} = require('../models/models');

const generadeJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

class UserController {
    async registration (req, res) {
        const {name, surname, patronymic, email, phone, password, role} = req.body;
        const img = req.file ? req.file.filename : 'default.png';
        try {
            const existingUserByEmail = await Users.findOne({where: {email}});
            if(existingUserByEmail) {
                return res.status(403).json({message: 'пользователь с таким email уже зарегистрирован'})
            };
            const existingUserByPhone = await Users.findOne({where: {phone}});
            if(existingUserByPhone) {
                return res.status(403).json({message: 'Пользователь с таким номером телефона уже зарегистрирвован'})
            };
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
            return res.status(200).json({message: 'Пользователь успешно зарегистрирован!', user, token})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Ошибка сервера'});
        };
    };

    async login (req, res) {
        const {email, phone, password} = req.body;
        let user;
        try { 
            if(email) {
                user = await Users.findOne({where: {email}});
            } else if(phone) {
                user = await Users.findOne({where: {phone}});
            } else if(!user) {
                return res.status(404).json({message: 'Пользователь с такими данными не зарегистрирован!'})
            }
            if(!user) {
                return res.status(404).json({message: 'Пользователь с такими данными не зарегистрирован'})
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if(!comparePassword) {
                return res.status(403).json({message: 'Не верный пароль'})
            }
            const token = generadeJwt(user.id, user.email, user.role);
            return res.status(200).json({message: 'Пользователь успешно авторизован', user, token})
        } catch(e) { 
            console.log(e);
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    };

    async check (req, res) {
        const token = generadeJwt(req.user.id, req.user.email, req.user.role)
        const user = await Users.findOne({where: {id: req.user.id}})
        return res.json({token, user})
    };
}

module.exports = new UserController();