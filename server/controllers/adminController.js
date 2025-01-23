const { Users } = require('../models/models');

class AdminController {
    async getUsers(req, res) {
        try {
            const users = await Users.findAll();
            return res.status(200).json(users)
        } catch (e) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await Users.destroy({ where: { id } });
            res.json({ message: 'User deleted successfully' });
        } catch (e) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, surname, patronymic, weightCategory, discharge, dateOfBirth, email, phone, role } = req.body;
            const img = req.file ? req.file.filename : null;
    
            // Найти пользователя по ID
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            // Обновить данные пользователя, если они предоставлены
            user.name = name !== undefined ? name : user.name;
            user.surname = surname !== undefined ? surname : user.surname;
            user.patronymic = patronymic !== undefined ? patronymic : user.patronymic;
            user.weightCategory = weightCategory !== undefined ? weightCategory : user.weightCategory;
            user.discharge = discharge !== undefined ? discharge : user.discharge;
            user.dateOfBirth = dateOfBirth !== undefined ? dateOfBirth : user.dateOfBirth;
            user.email = email !== undefined ? email : user.email;
            user.phone = phone !== undefined ? phone : user.phone;
            user.role = role !== undefined ? role : user.role;
            if (img) {
                user.img = img;
            }
    
            // Сохранить обновленные данные пользователя
            await user.save();
    
            res.json({ message: 'User updated successfully', user });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Server Error' });
        }
    }
    
}

module.exports = new AdminController();
