const { News } = require('../models/models');

class NewsController {
    async createNews(req, res) {
        const { title, content } = req.body;
        const img = req.file ? req.file.filename : null;

        try {
            const news = await News.create({ title, content, img });
            return res.status(201).json(news);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async getNews(req, res) {
        try {
            const news = await News.findAll({
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).json(news);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async updateNews(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        const img = req.file ? req.file.filename : null;

        try {
            const news = await News.findOne({ where: { id } });
            if (!news) {
                return res.status(404).json({ message: 'News not found' });
            }

            news.title = title || news.title;
            news.content = content || news.content;
            if (img) {
                news.img = img;
            }

            await news.save();
            return res.status(200).json(news);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server Error' });
        }
    }

    async deleteNews(req, res) {
        const { id } = req.params;

        try {
            await News.destroy({ where: { id } });
            return res.status(200).json({ message: 'News deleted successfully' });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new NewsController();