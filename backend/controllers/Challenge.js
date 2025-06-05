const Challenge = require("../models/Challenge");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require('moment');
const Answer = require('../models/Answer');


exports.createChallenge = async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }


        
        const token = authHeader.split(" ")[1];
       
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const author = decoded.id;  

        const { title, description, dateTobePublished, type } = req.body;
        // console.log(title, description, dateTobePublished, type)

        // Validate input fields
        if (!title || !description || !dateTobePublished || !type) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields",
            });
        }

        const [year, month, day] = dateTobePublished.split('-');
        const parsedDate = new Date(`${year}-${month}-${day}T00:00:00+05:30`);  

        // Check if the parsedDate is valid
        if (isNaN(parsedDate)) {
            return res.json({
                success: false,
                message: "Invalid date format. Please use DD/MM/YYYY.",
            });
        }

        const user = await User.findById(author);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const newChallenge = await Challenge.create({
            title,
            description,
            dateTobePublished: parsedDate,
            type,
            author
        });

        console.log(user.challenges)


        
        user.challenges.push(newChallenge._id);
        await user.save();


        // Step 4: Return the success response
        return res.status(200).json({
            success: true,
            message: "Challenge created successfully",
            data: newChallenge,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAdminChallenges = async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; 

        
        const challenges = await Challenge.find({ author: userId });

       
        return res.status(200).json({ 
            success: true,
            message : "Challenges fetched successfully",
            data : challenges 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: "Server error, unable to retrieve challenges" });
    }
}

exports.getChallengebyId = async (req, res) => {
    try {
      const { challengeId } = req.params;
  
    const ChallengeData = await Challenge.findById(challengeId);
  
      if (!Challenge) {
        return res.status(404).json({
          success: false,
          message: "Challenge not found",
        });
      }
  
      // Return the Challenge details
      return res.status(200).json({
        success: true,
        data: ChallengeData,
      });
    } catch (error) {
      // Handle any errors that occur
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  exports.getTodayChallenges = async (req, res) => {
    try {
        const today = moment().startOf('day').toDate();

        const todayChallenges = await Challenge.find({
            dateTobePublished: {
                $gte: today,
                $lt: moment(today).endOf('day').toDate(),
            },
        });

        if (!todayChallenges.length) {
            return res.status(404).json({
                success: false,
                message: "No challenges found for today",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Challenges found for today",
            data: todayChallenges,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,

        });
    }
};
  

exports.submitAnswer = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const {githubLink} = req.body;
        const userId = req.user.id; // Assuming you're extracting the user from the token

        // Find the challenge
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }

        // Create a new answer
        const answer = new Answer({
            challenge: challengeId,
            user: userId,
            link: githubLink,
        });

        await answer.save();

        // Add the challenge to the user's submitted challenges array
        const user = await User.findById(userId);
        if (!user.challenges.includes(challengeId)) {
            user.challenges.push(challengeId);
            await user.save();
        }

        res.status(201).json({ message: "Answer submitted successfully", answer });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};


exports.getAnswersForChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;

        // Fetch all answers for the given challenge
        const answers = await Answer.find({ challenge: challengeId }).populate('user');
        
        
        res.status(200).json({data:answers});
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};


exports.getUserChallenges = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('challenges');
        
        res.status(200).json(user.challenges);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
