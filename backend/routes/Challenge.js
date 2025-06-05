const express = require("express");
const router = express.Router();

const {createChallenge, getAdminChallenges, getChallengebyId, getTodayChallenges} = require("../controllers/Challenge");
const { submitAnswer, getAnswersForChallenge, getUserChallenges } = require('../controllers/Challenge');
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/auth");

router.post("/admin/createChallenge",auth, isAdmin,  createChallenge)

router.get("/admin/getChallenges", auth, isAdmin, getAdminChallenges )

router.get("/admin/getChallengebyId/:challengeId",auth,isAdmin,getChallengebyId)

router.get("/challengeOfTheDay", auth, getTodayChallenges );

router.post('/:challengeId/submit-answer', auth, submitAnswer);

// Route to get all answers for a particular challenge
router.get('/:challengeId/answers', auth,isAdmin, getAnswersForChallenge);

// Route to get all challenges a user has submitted answers to
router.get('/user/challenges', auth, getUserChallenges);

module.exports = router;