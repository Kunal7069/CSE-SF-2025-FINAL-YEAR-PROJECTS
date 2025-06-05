const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },  
  status: {
    type: String,
    enum: ['pending', 'published'],
    default: 'pending',
  },
  approvedBy :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default : null,
  },
  topic: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Topic",
  },
  difficulty :{
    type: String,
    enum: ['Hard', 'Medium', 'Easy']
  },
  createdAt: {
		type:Date,
		default:Date.now
	},
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);

