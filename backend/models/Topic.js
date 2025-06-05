const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // blog: [
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref: "Blog",
    //     }
    // ],
}, { timestamps: true });

module.exports = mongoose.model("Topic", topicSchema);