require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./router/index')

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,()=>console.log(`Server is started on port ${PORT}`))
    } catch (error) {
        return error
    }
}

start();