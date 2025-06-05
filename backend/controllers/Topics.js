const Topic = require("../models/Topic");

//create Topics
exports.createTopic = async(req,res) => {
    try{
        const {name}  = req.body;
        if(!name){
            return res.status(401).json({
                success : false,
                message: "Topic name not avaiable",
            })
        }

        const newTopic = await Topic.create({
            name
        });

        if(!newTopic){
            return res.status(401).json({
                success: false,
                message: "New topic cannot be pushed into the database"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Topic created successfully",
            data : newTopic
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//getAllTopics
exports.getAllTopics = async(req,res) =>{
    try{
        const allTopics = await Topic.find({}, {name: true});
        
        return res.status(200).json({
            success: true,
            message: "All topics recived",
            data: allTopics,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// Edit Topic
exports.editTopic = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name } = req.body;

        if (!name) {
            return res.status(401).json({
                success: false,
                message: "Topic name not available",
            });
        }

        const updatedTopic = await Topic.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedTopic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Topic updated successfully",
            data: updatedTopic,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Topic
exports.deleteTopic = async (req, res) => {
    try {
        const { id } = req.params; 

        const deletedTopic = await Topic.findByIdAndDelete(id);

        if (!deletedTopic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Topic deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getTopicDetails = async (req, res) => {
    try {
        const { id } = req.params; // Get the topic ID from the request parameters

        const topic = await Topic.findById(id);

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Topic details retrieved successfully",
            data: topic,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};