const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User"); 
const Chat = require("../models/Chat");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateContent = async (req, res) => {
  try {
    const { userId, userMessage } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = userMessage; 
    const result = await model.generateContent(prompt);

    const botResponse = result.response.text(); 

    // Create a new chat entry using the Chat model
    const newChat = new Chat({
      userMessage,
      botResponse,
      timestamp: new Date(),
    });

    await newChat.save();

    user.chatHistory.push(newChat._id);

    await user.save();

    res.json({ success :true,botResponse });

    // console.log("Bot response:", botResponse);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('chatHistory');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

       return res.status(200).json({
        success : true,
        chatHistory: user.chatHistory,
    })
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteAllChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Chat.deleteMany({ user: userId });

    user.chatHistory = [];
    await user.save();

    res.json({ success : true, message: "All chats deleted successfully" });
  } catch (error) {
    console.error("Error deleting chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};


