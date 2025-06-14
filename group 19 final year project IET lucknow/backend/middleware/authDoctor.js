import jwt from 'jsonwebtoken';

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        // Option 1: Initialize req.body if undefined
        if (!req.body) {
            req.body = {};
        }
        req.body.docId = token_decode.id;

        // Option 2: Use req.user instead (recommended)
        // req.user = { userId: token_decode.id };

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authDoctor;