import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB=async ()=>{
    try{
        const {MONGO_URI}=ENV;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");
        const conn=await mongoose.connect(MONGO_URI);
        console.log("MONGODB CONNECTED",conn.connection.host);
    }catch(err){
        console.error("Error connection to MONGODB:",err);
        process.exit(1); //1 status code means fail,0 means success
    }
}