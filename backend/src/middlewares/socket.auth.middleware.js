import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

//socket.io middlewares have access to socket instance and the next 
export const socketAuthMiddleware=async (socket,next)=>{
    try{
        const token= socket.handshake.headers.cookie?.split("; ").find((cookie)=>cookie.startsWith("jwt="))?.split("=")[1];

        if(!token){
            console.log("socket connection failed: No token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }

        let decoded;
        try{
            decoded=jwt.verify(token, ENV.JWT_SECRET);
        }
        catch(error){
            if(err.name==="TokenExpiredError"){
                return next(new Error("Unauthorized - Token expired"));
            }
            return next(new Error("Unauthorized - Invalid token"));
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return next(new Error("User does not exist"));
        }

        socket.user=user;
        socket.userId=user._id.toString();

        console.log(`Socket connection established for user ${user.fullName}(${user._id})`);
        next();
    }
    catch(error){
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
}