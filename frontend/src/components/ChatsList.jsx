import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatsFound from './NoChatsFound';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';

export default function ChatsList() {
  const {chats, getMyChatPartners, setSelectedUser, isUsersLoading}=useChatStore();

  useEffect(()=>{
    getMyChatPartners();
  },[getMyChatPartners]);

  if(isUsersLoading) return <UsersLoadingSkeleton/>;

  if(chats.length==0) return <NoChatsFound/>
  return (
    <>
      {
        chats.map((chat)=>(
          <div key={chat._id} className='bg-cyan-500/5 p-3 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors' onClick={()=>setSelectedUser(chat)}>
            <div className='flex items-center gap-3'>
              {/*TODO fix this with socket server everyone is being shown online now*/ }
              <div className="avatar online">
                <div className='size-12 rounded-full'>
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className='size-full object-cover'/>
                </div>
              </div>
              <div className='text-slate-200 font-medium truncate'>{chat.fullName}</div>
            </div>
          </div>
        ))
      }
    </>
  )
}
