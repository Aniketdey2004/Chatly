import {Server} from "socket.io";
import http from "http";
import express from "express";
import {ENV} from './env.js';
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app=express();
//we are creating a http server which contains a express app and socket server
//the http server passes events to socket.io server and rest api req to express app
const server=http.createServer(app);

const io=new Server(server, {
    cors:{
        origin:[ENV.CLIENT_URL],
        credentials:true
    }
});

//for every connection request do authentication
io.use(socketAuthMiddleware);

//for storing the online users
const onlineUsers={};


//comments for my future reference
//the socket.io server after forming the connection internally emit a connection event which it listens
//each connection get a unique socket object 
//you should define every socket handle inside the below callback and middlewares also for socket  
io.on("connection",(socket)=>{
    //getting user attached to socket after authentication check authentication middleware
    console.log("A user connected", socket.user.fullName);
    const userId=socket.userId; 
    onlineUsers[userId]=socket.id;

    //this function sends event to all connected clients of the server 
    io.emit("getOnlineUsers",Object.keys(onlineUsers));

    //this function is the event listener and the callback is the handler
    socket.on("disconnect",()=>{
        console.log("A user disconnected", socket.user.fullName);
        delete onlineUsers[userId];
        io.emit("getOnlineUsers",Object.keys(onlineUsers));
    });
});

export {io, server, app};