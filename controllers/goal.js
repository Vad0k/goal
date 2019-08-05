const Goal = require('../models/Goal');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const goal = await Goal.find({user:req.user.id});
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
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
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