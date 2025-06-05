const express = require("express");
const router = express.Router();

const{
    generateContent,
    getAllChats,
    deleteAllChats
} = require("../controllers/Chat");

const {auth} = require("../middlewares/auth")


// Route for user login
router.post("/generate-content", auth,generateContent)

router.get("/all-chats/:userId",auth,getAllChats)

router.delete("/delete-chats/:userId",auth,deleteAllChats)



module.exports = router