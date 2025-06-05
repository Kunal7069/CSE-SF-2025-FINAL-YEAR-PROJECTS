const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const Topic = require("../models/Topic");
const User = require("../models/User")

//create a Blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, author, topicId, difficulty } = req.body;

        // Check if required fields are provided
        if (!title || !content || !author || !topicId || !difficulty) {
            return res.status(400).json({
                success: false,
                message: "Title, content, author, topicId, and difficulty are required"
            });
        }

        // Check if the topic exists
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        // Create a new blog
        const newBlog = await Blog.create({
            title,
            content,
            author,
            topic: topicId,
            status: 'pending',
            difficulty
        });

        // Find the user by author ID and add the blog to their blogs array
        const user = await User.findById(author);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Author not found",
            });
        }

        user.blogs.push(newBlog._id);
        await user.save();

        // console.log("Inside create blog try BE");

        return res.status(200).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



//get blogs of a certain topic with their title
exports.getBlogsByTopic = async (req, res) => {
    try {
      const { topicId } = req.params;
  
      // Ensure topicId is treated as a string if it's not an ObjectId
      const blogs = await Blog.find({ topic: topicId, status: 'published' }).select('title difficulty');
  
      return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.getBlogsByTopicName = async (req, res) => {
    try {
      const { topicName } = req.params;
  
      // Find the topic by its name
      const topic = await Topic.findOne({ name: topicName }).select('_id');
  
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: 'Topic not found',
        });
      }
  
      // Find the blogs associated with the topic's _id
      const blogs = await Blog.find({ topic: topic._id, status: 'published' }).select('title difficulty');
  
      return res.status(200).json({
        success: true,
        message: 'Blogs fetched successfully',
        data: blogs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
// get the full content of a blog
exports.getBlogContent = async(req,res) =>{
    try{
        const {blogId}  = req.params;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID",
            });
        }

        const blog = await Blog.findById(blogId).populate('author', 'name').populate('topic', 'name');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (blog.status !== 'published') {
            return res.status(403).json({
                success: false,
                message: "This blog is not published yet",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog content fetched successfully",
            data: blog,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//approve a blog
exports.approveBlog = async(req,res) =>{
    try{
        const {blogId, status, approvedBy} = req.body;

        const blog = await Blog.findByIdAndUpdate(blogId, { status,approvedBy }, { new: true });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        const blogData = await Blog.findById(blogId).populate('approvedBy');

        return res.status(200).json({
            success: true,
            message: `Blog ${status} successfully`,
            data: blogData,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// edit a Blog
exports.editBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, content, author, topicId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID",
            });
        }

        const updates = {};
        if (title) updates.title = title;
        if (content) updates.content = content;
        if (author) updates.author = author;
        if (topicId) {
            const topic = await Topic.findById(topicId);
            if (!topic) {
                return res.status(404).json({
                    success: false,
                    message: "Topic not found",
                });
            }
            updates.topic = topicId;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updates, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// delete a Blog
exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID",
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: deletedBlog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getPublisherPendingBlogs = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch all blogs authored by the user with status 'pending'
        const blogs = await Blog.find({ author: userId, status: 'pending' }).populate('topic');

        if (!blogs.length) {
            return res.status(404).json({
                success: false,
                message: "No pending blogs found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


exports.getPublisherPublishedBlogs = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch all blogs authored by the user with status 'published'
        const blogs = await Blog.find({ author: userId, status: 'published' }).populate('topic').populate('approvedBy');

        if (!blogs.length) {
            return res.status(404).json({
                success: false,
                message: "No published blogs found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get all pending blogs for admin
exports.getAllPendingBlogs = async (req, res) => {
    try {
        // Fetch all blogs with status 'pending'
        const blogs = await Blog.find({ status: 'pending' }).populate('topic');

        if (!blogs.length) {
            return res.status(404).json({
                success: false,
                message: "No pending blogs found",
            });
        }

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllPublishedBlogs = async (req, res) => {
    try {
        // Fetch all blogs with status 'pending'
        const blogs = await Blog.find({ status: 'published' }).populate('topic').populate('approvedBy');

        if (!blogs.length) {
            return res.status(404).json({
                success: false,
                message: "No published blogs found",
            });
        }

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};





exports.fetchBlogDetails = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Validate the blog ID
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    // Find the blog by ID
    const blog = await Blog.findById(blogId).populate('topic');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Return the blog details
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};