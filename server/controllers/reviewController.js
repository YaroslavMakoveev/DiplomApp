const { Reviews } = require('../models/models');

class ReviewController {
    async createReview(req, res) {
        const { name, surname, email, message } = req.body;
        try {
            const review = await Reviews.create({ name, surname, email, message });
            return res.status(201).json(review);
        } catch (e) {
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async getReviews(req, res) {
        try {
            const reviews = await Reviews.findAll({ order: [['date', 'DESC']] });
            return res.status(200).json(reviews);
        } catch (e) {
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async deleteReview(req, res) {
        const { id } = req.params;
        try {
            await Reviews.destroy({ where: { id } });
            return res.status(200).json({ message: 'Review deleted successfully' });
        } catch (e) {
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async checkEmail(req, res) {
        const { email } = req.query;
        try {
            const reviews = await Reviews.findAll({ where: { email } });
            return res.status(200).json(reviews);
        } catch (e) {
            return res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new ReviewController();
