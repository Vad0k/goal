const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser'); // плагин по парсингу входных данных POST, GET и т.д
const cors = require('cors'); // помогает серверу обрабатывать курс запросы от клиента
const morgan = require('morgan'); // для более удобного логирования запросов

const goalRouter = require('./routes/goal');

const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then( () => console.log('MongoDB connected'))
    .catch( error => console.log('MongoDB error:', error));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // позволяет напрямую обращаться к директории и файллам через ссылку
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //добавляем в Express плагины для отправки JSON запрсов
app.use(cors());

//app.use('api/user');
app.use('api/goal', goalRouter);



// firebase
var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goal-nodejs.firebaseio.com"
});


module.exports = app;