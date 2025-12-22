import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


const notificationSound=new Audio('./sounds/notification.mp3');

export const useChatStore= create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab: "chats",
    selectedUser:null,
    isUsersLoading: false,
    isMessagesLoading:false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled"))===true,
    sidebar:true,
    toggleSidebar:()=>{
        set({sidebar:!get().sidebar});
    },
    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled);
        set({isSoundEnabled:!get().isSoundEnabled});
    },
    setActiveTab:(tab)=>{
        set({activeTab:tab});
    },
    setSelectedUser:(selectedUser)=>set({selectedUser}),
    getAllContacts:async()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get("/message/contacts");
            set({allContacts:res.data});
        }
        catch(error){
            console.log("Error in fetching contacts",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    filterContacts:(search)=>{
        set({allContacts:get().allContacts.filter((contact)=>(contact.fullName.includes(search)))});
    },
    getMyChatPartners:async()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get("/message/chats");
            set({chats:res.data});
        }
        catch(error){
            console.log("Error in loading chats",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    filterChatPartners:(search)=>{
        set({chats:get().chats.filter((chat)=>(chat.fullName.includes(search)))});
    },
    getMessagesByUserId:async(userId)=>{
        set({isMessagesLoading:true});
        try{
            const chatMessages=await axiosInstance.get(`/message/${userId}`);
            set({messages:chatMessages.data});
        }
        catch(error){
            console.log("Error in fetching messages",error);
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessage:async(messageData)=>{
        const {selectedUser}=get();
        const {authUser}=useAuthStore.getState();
        const tempId=`temp-${Date.now()}`;
        const optimisticMessage={
            _id:tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic:true
        };

        set((state) => ({
            messages: [...state.messages, optimisticMessage],
        }));
        
        try{
            console.log("requesting");
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === tempId ? res.data : msg
                ),
            }));
        }
        catch(error){
            toast.error(error.response.data.message);
            set((state)=>({
                messages:state.messages.filter((msg)=>msg._id!==tempId)
            }));
        }
    },
    subscribeToMessages:()=>{
        const {selectedUser, isSoundEnabled}=get();
        if(!selectedUser) return;

        const socket=useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
            const isMessageFromSelectedUser=newMessage.senderId===selectedUser._id;
            if(!isMessageFromSelectedUser) return;
            set((state) => ({
                messages: [...state.messages, newMessage],
            }));

            if(isSoundEnabled){
                notificationSound.currentTime=0;
                notificationSound.play().catch((e)=>console.log("Audio play failed:",e));
            }
        });
    },
    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    storeCleanUp:()=>{
        set({activeTab:"chats",selectedUser:null});
    }
}));