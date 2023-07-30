// utils/db.js
import mongoose from "mongoose"

const dbConnect = () =>{
    try
    {
        mongoose.connect(process.env.MONGO_URI);
        console.log("connected to MongoDB");
    }
    catch(error)
    {
        console.log("MongoDB connection error" + error);
    }
}

export default dbConnect;