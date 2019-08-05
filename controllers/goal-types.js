const ModelGoalTypes = require('../models/goal-types');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const goalTypes = await ModelGoalTypes.find({});
        res.status(200).json(goalTypes)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const goalTypes = await ModelGoalTypes.findById(req.params.id);
        res.status(200).json(goalTypes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await ModelGoalTypes.remove({_id: req.params.id});
        res.status(200).json({message:'Цель удалена'});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    const goalTypes = new ModelGoalTypes({
        title: req.body.title,
    });
    try {
        await goalTypes.save();
        res.status(201).json(goalTypes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    const updated = {
        title: req.body.title,
    };

    try {
        const goalTypes = await ModelGoalTypes.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(goalTypes);
    } catch (e) {
        errorHandler(res, e);
    }
};