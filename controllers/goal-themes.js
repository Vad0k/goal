const ModelGoalThemes = require('../models/goal-themes');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const goalThemes = await ModelGoalThemes.find({});
        res.status(200).json(goalThemes)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const goalThemes = await ModelGoalThemes.findById(req.params.id);
        res.status(200).json(goalThemes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await ModelGoalThemes.remove({_id: req.params.id});
        res.status(200).json({message:'Цель удалена'});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    const goalThemes = new ModelGoalThemes({
        title: req.body.title,
    });
    try {
        await goalThemes.save();
        res.status(201).json(goalThemes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        title: req.body.title,
    };

    try {
        const goalThemes = await ModelGoalThemes.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(goalThemes);
    } catch (e) {
        errorHandler(res, e);
    }
};