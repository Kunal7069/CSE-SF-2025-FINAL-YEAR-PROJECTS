const express = require("express");
const router = express.Router();

const { 
    createBlog,
    getBlogsByTopicName,
    getBlogContent,
    approveBlog,
    editBlog,
    deleteBlog,
    getPublisherPendingBlogs,
    getPublisherPublishedBlogs, 
    fetchBlogDetails,
    getAllPendingBlogs,
    getAllPublishedBlogs} = require("../controllers/Blog");

const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/auth");
const { isPublisher } = require("../middlewares/auth");


router.post('/create', auth, (req, res, next) => {
    if (req.user.role === 'Admin') {
        isAdmin(req, res, next);
    } else if (req.user.role === 'Publisher') {
        isPublisher(req, res, next);
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
}, createBlog);


// Route to get all blogs under a specific topic
// router.get('/topic/:topicId', getBlogsByTopic);

// Route to get the content of a specific blog
router.get('/blog/:blogId', fetchBlogDetails);

// Admin approves or rejects a blog
router.post('/approve', auth, isAdmin, approveBlog);

//route to get all published blogs of a topic 
router.get('/topic/:topicName', getBlogsByTopicName);

// route to edit a blog
router.put('/blog/edit/:blogId', auth, (req, res, next) => {
    if (req.user.role === 'Admin') {
        isAdmin(req, res, next);
    } else if (req.user.role === 'Publisher') {
        isPublisher(req, res, next);
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
}, editBlog);


//route to delete a blog
router.delete('/blog/delete/:blogId', auth, (req, res, next) => {
    if (req.user.role === 'Admin') {
        isAdmin(req, res, next);
    } else if (req.user.role === 'Publisher') {
        isPublisher(req, res, next);
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
}, deleteBlog);




// router.delete('/blog/delete/:blogId', auth, isAdmin, deleteBlog);

// get userblogs with status pending
router.get('/publisher/:userId/pending-blogs', auth, isPublisher, getPublisherPendingBlogs)

router.get('/publisher/:userId/published-blogs', getPublisherPublishedBlogs);


// Get pending blogs for Admin
router.get('/admin/pending-blogs',auth,isAdmin,getAllPendingBlogs)

router.get('/admin/published-blogs',auth,isAdmin,getAllPublishedBlogs)



module.exports = router;