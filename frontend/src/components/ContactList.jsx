import React from 'react'
import {useEffect} from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import {useChatStore} from "../store/useChatStore.js";

export default function ContactList() {
  const {allContacts, getAllContacts, isUsersLoading, setSelectedUser}= useChatStore();

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
              {/*TODO fix this with socket server everyone is being shown online now*/ }
              <div className="avatar online">
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
