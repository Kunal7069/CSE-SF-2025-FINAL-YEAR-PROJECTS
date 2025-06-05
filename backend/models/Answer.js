const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);