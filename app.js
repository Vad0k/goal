const express = require('express');
const mongoose = require('mongoose');
const passwport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser'); // плагин по парсингу входных данных POST, GET и т.д
const cors = require('cors'); // помогает серверу обрабатывать курс запросы от клиента
const morgan = require('morgan'); // для более удобного логирования запросов

const authRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goal');
const goalThemesRoutes = require('./routes/goal-themes');
const goalTypesRoutes = require('./routes/goal-types');


const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useCreateIndex: true})
    .then(()=>console.log('MongoDB conndected'))
    .catch(error => console.log(error));

app.use(passwport.initialize());
require('./middleware/passport')(passwport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // позволяет напрямую обращаться к директории и файллам через ссылку
app.use(bodyParser.urlencoded({extended: true})); // автоматически разбирать входные данные
app.use(bodyParser.json()); // добавляем в Express плагины для отправки JSON запрсов
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/goal-themes', goalThemesRoutes);
app.use('/api/goal-types', goalTypesRoutes);


module.exports = app;