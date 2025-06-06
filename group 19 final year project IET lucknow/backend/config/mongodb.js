import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.connection.on('connected',()=>console.log('DATABASE connected'))

    await mongoose.connect(`${process.env.MONGODB_URI.replace(/\/$/, '')}/hospital`);


}

export default connectDB