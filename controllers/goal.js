const Goal = require('../models/goal');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const goal = await Goal.find({});
        res.status(200).json(goal)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const category = await Goal.findById(req.params.id);
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Goal.remove({_id: req.params.id});
        res.status(200).json({message:'Цель удалена'});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    const goal = new Goal({
        "user_id": 0,
        "type_id": req.body.type_id,
        "theme_id": req.body.theme_id,
        "title": req.body.title,
        "description": req.body.description,
        "criterion": {
            "title": req.body.criterion.title
        },
        "image": req.body.image,
        "tasks": {
            "title": req.body.tasks.title,
            "description": req.body.tasks.description,
            "budget": req.body.tasks.budget
        },
        "date_completion": req.body.date_completion,
        "word_price": {
            "amount": req.body.word_price.amount,
            "mode_id": req.body.word_price.mode_id
        }
    });

    try {
        await goal.save();
        res.status(201).json(goal);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
    };

    if(req.file){
        updated.imageSrc = req.file.path;
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};