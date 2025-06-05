const nodemailer = require("nodemailer");

exports.mailSender = async(email, title, body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        let info = transporter.sendMail({
            from : "MASTER-BACKEND TEST",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })
        console.log(info);
        return info; 
    }
    catch(error){
        console.log("error occurred while creating trasnporter", error.message);
    }
}