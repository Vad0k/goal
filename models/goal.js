const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    criterion: [
        {
            title: {
                type: String,
            }
        }
    ],
    type_id: {
        required: true,
        ref: 'goal_types',
        type: Schema.Types.ObjectId
    },
    theme_id: {
        ref: 'goal_themes',
        type: Schema.Types.ObjectId
    },
    image: {
        type: String,
        default: ''
    },
    tasks: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            budget: {
                type: Number,
            }
        }
    ],
    date_completion: {
        type: Date,
    },
    word_price:{
        amount: Number,
        mode_id: {
            type: Number,
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        }
    }
});

module.exports = mongoose.model('goal', schema);