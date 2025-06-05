const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Visitor', 'Publisher'],
      default: 'Visitor',
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      }
    ],
    chatHistory: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chat"
      }
  ],
  challenges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge" 
    }
  ],
    
  }, { timestamps: true });

module.exports = mongoose.model("User", userSchema);


// const User = mongoose.model('User', userSchema);
// module.exports = User;