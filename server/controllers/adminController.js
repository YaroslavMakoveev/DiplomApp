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
            const { name, surname, patronymic, email, phone, role } = req.body;
            await Users.update(
                { name, surname, patronymic, email, phone, role },
                { where: { id } }
            );
            res.json({ message: 'User updated successfully' });
        } catch (e) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new AdminController();
