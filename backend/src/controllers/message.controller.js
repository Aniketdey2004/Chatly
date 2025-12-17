import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from '../lib/cloudinary.js'

export const getAllContacts= async(req, res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }   
    catch(error){
        console.log("Error in getting All contacts",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const getMessageByUserId= async (req,res)=>{
    try{
        const myid=req.user._id;
        const {id:userToChatId}= req.params;
        const userExists=await User.exists({_id:userToChatId});
        if(!userExists){
            return res.status(404).json({message:"User does not exist"});
        }
        const messages=await Message.find({
            $or:[
                {senderId:myid, receiverId:userToChatId},
                {senderId: userToChatId, receiverId: myid}
            ]
        });
        res.status(200).json(messages);
    }
    catch(error){
        console.log("Error in getMessages controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const sendMessage=async (req,res)=>{
    try{
        const {text, image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        
        if(!text && !image){
            return res.status(400).json({message:"Text or image is required"});
        }
        if(senderId.equals(receiverId)){
            return res.ststus(400).json({message:"cannot send messages to yourself"});
        }
        const receiverExists=await User.exists({_id:receiverId});
        if(!receiverExists){
            return res.status(404).json({message:"Receiver not found"});
        }

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();
        //todo: send realtime messages to the receiver using socket.io
        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error in send message controller",error);
        res.status(500).json({message:"Internal Server error"});
    }
};

export const getChatPartners=async (req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        
        const messages=await Message.find({
            $or:[
                {senderId: loggedInUserId},
                {receiverId: loggedInUserId}
            ]
        });

        const chatPartnersIds=[
            ...new Set(
                messages.map((msg)=>
                    msg.senderId.toString() === loggedInUserId.toString()?msg.receiverId.toString():msg.senderId.toString()
                )
            )
        ];

        const chatPartners=await User.find({_id:{$in:chatPartnersIds}}).select("-password");
        res.status(200).json(chatPartners);
    }
    catch(error){
        console.log("Error in ChatPartners controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};