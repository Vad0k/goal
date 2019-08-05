const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('goal_types', schema);