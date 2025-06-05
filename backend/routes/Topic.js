const express = require("express");
const router = express.Router();

const { createTopic, getAllTopics, editTopic, deleteTopic, getTopicDetails } = require('../controllers/Topics');

const {isAdmin, isPublisher, isVisitor} = require("../middlewares/auth");
const {auth} = require("../middlewares/auth");

// Admin creates new topics
router.post('/create', auth,isAdmin, createTopic);

// Retrieve all topics for the dropdown
// router.get('/',auth,isAdmin, getAllTopics);

// router.get('/', auth, (req, res, next) => {
//     if (req.user.role === 'Admin') {
//         isAdmin(req, res, next);
//     } else if (req.user.role === 'Publisher') {
//         isPublisher(req, res, next);
//     }
//     else if(req.user.role === "Visitor"){
//         isVisitor(req, res, next);
//     } else {
//         return res.status(403).json({ message: 'Unauthorized' });
//     }
// },getAllTopics);

router.get('/', getAllTopics);

// Admin edits a topic
router.put('/edit/:id',auth,isAdmin, editTopic);

//Admin deletes a topic
router.delete('/delete/:id',auth,isAdmin,  deleteTopic)

router.get('/:id', getTopicDetails);

module.exports = router;