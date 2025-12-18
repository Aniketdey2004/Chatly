import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const baseURL= import.meta.env.MODE==="development"? "http://localhost:3000":"/";

export const useAuthStore= create((set,get)=>({
   authUser:null,
   isCheckingAuth: true,
   isSigningUp:false,
   isLoggingIn:false,
   socket:null,
   onlineUsers:[],

   checkAuth: async ()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
        }
        catch(error){
            console.log("Error in authCheck:",error);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
   },
   signup:async(data)=>{
        set({isSigningUp:true});
        try{
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            get().connectSocket();
            toast.success("Account created Successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
   },
   login: async(data)=>{
        set({isLoggingIn:true});
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser: res.data});
            get().connectSocket();
            toast.success("Logged in Successfully")
        }catch(error){
            console.log("Error in Signing In", error);
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
   },
   logout:async()=>{
     try{
        await axiosInstance.post("/auth/logout");
        set({authUser:null});  
        get().disconnectSocket();
        toast.success("Logged out successfully");
     }  
     catch(error){
        console.log("Error in logging out",error);
        toast.error("Error in logging out");
     }
   },
   updateProfile:async(data)=>{
        try{
            const res=await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated Successfully");
        }catch(error){
            console.log("Error in update profile",error);
            toast.error(error.response.data.message);
        }
   },
   connectSocket:()=>{
      const {authUser}=get();
       if(!authUser || get().socket?.connected) 
        return 

       const socket=io(baseURL, {withCredentials:true});
        set({socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        });
   },
   disconnectSocket:()=>{
       if(get().socket?.connected) get().socket.disconnect();
   }
}));