const User = require('../models/user');
const keys = require('../config/keys');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');



module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {

            const token = jsonwebtoken.sign({
                email: candidate.email,
                user_id: candidate._id
            },
            keys.secretTokenKey, {expiresIn: 3600});

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароль не совпадает.'
            })
        }

    } else {
        res.status(404).json({
            message: 'Пользователь с таким E-mail не найден.'
        });
    }

};

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(209).json({
            message: 'Такой E-mail занят. Попробуйте другой.'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }

};