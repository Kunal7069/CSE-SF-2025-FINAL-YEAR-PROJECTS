const jwt = require("jsonwebtoken");
require("dotenv").config();


//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        // if token missing return response

        
        
        
        if (!token) {
            return res.status(401).json({
                success: "false",
                message: "token is missing",
            })
        }
        

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch (err) {
            // verificationn issue
            return res.status(401).json({
                success: false,
                message: err.message,
                
            })
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}


// isAdmin Middleware
exports.isAdmin = (req, res, next) => {
    try {
        // console.log("Inside admin try",req.user)
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        });
    }
};

//isVisitor
exports.isVisitor = async (req, res, next) => {
    try {
        if (req.user.role != "Visitor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for visitors only",
            })
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        })
    }
}

exports.isPublisher = async(req, res, next) =>{
    try{
        if(req.user.role != "Publisher"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for publishers only",
            })
        }    
        next();    
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified, please try again",
        })
    }
}

// exports.Visitor = async(req, res, next) =>{
//     try{
//         if(req.user.role != "Publisher"){
//             return res.status(401).json({
//                 success : false,
//                 message : "This is a protected route for publishers only",
//             })
//         }    
//         next();    
//     }
//     catch(error){
//         return res.status(500).json({
//             success : false,
//             message : "User role cannot be verified, please try again",
//         })
//     }
// }