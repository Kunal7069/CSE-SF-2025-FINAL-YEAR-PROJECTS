const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateTobePublished: {
        type: Date,
        requires :true
    },
    typeOfChallenge: {
        type: String,
        enum: ['Weekly', 'Daily'],
        required: true,
        default: 'Daily'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    
}, { timestamps: true });

module.exports = mongoose.model("Challenge", challengeSchema);