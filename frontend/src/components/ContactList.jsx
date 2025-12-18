import React from 'react'
import {useEffect} from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import {useChatStore} from "../store/useChatStore.js";
import { useAuthStore } from '../store/useAuthStore.js';

export default function ContactList() {
  const {allContacts, getAllContacts, isUsersLoading, setSelectedUser}= useChatStore();
  const {onlineUsers}=useAuthStore();
  useEffect(()=>{
    getAllContacts();
  },[getAllContacts]);

  if(isUsersLoading) return <UsersLoadingSkeleton/>;

  return (
    <>
      {
        allContacts.map((contact)=>(
          <div key={contact._id} className='bg-cyan-500/5 p-3 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors' onClick={()=>setSelectedUser(contact)}>
            <div className='flex items-center gap-3'>
              <div className={`avatar ${onlineUsers.includes(contact._id.toString())?"online":"offline"}`}>
                <div className='size-12 rounded-full'>
                  <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} className='size-full object-cover'/>
                </div>
              </div>
              <div className='text-slate-200 font-medium truncate'>{contact.fullName}</div>
            </div>
          </div>
        ))
      }
    </>
  )
}
