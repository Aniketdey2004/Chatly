import React from 'react'
import { useChatStore } from '../store/useChatStore'
import {useAuthStore} from '../store/useAuthStore';
import { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';
import { useRef } from 'react';

export default function ChatContainer() {
  const messages=useChatStore((state)=>state.messages);
  const selectedUser=useChatStore((state)=>state.selectedUser);
  const getMessagesByUserId=useChatStore((state)=>state.getMessagesByUserId);
  const isMessagesLoading=useChatStore((state)=>state.isMessagesLoading);
  const subscribeToMessages=useChatStore((state)=>state.subscribeToMessages);
  const unsubscribeFromMessages=useChatStore((state)=>state.unsubscribeFromMessages);

  const authUser=useAuthStore((state)=>state.authUser);
  const msgRef=useRef(null);

  useEffect(()=>{
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return ()=>unsubscribeFromMessages();
  },[getMessagesByUserId, selectedUser,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(()=>{
    if(msgRef.current!=null){
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messages])

  return (
    <div className='h-full flex flex-col'>
      <ChatHeader/>
      <div className='flex-1 px-6 overflow-y-auto py-8'>
        {
          messages.length>0 && !isMessagesLoading?(
            <div className='max-w-3xl mx-auto space-y-6'>
              {
                messages.map((message)=>(
                  <div key={message._id} className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`}>
                      <div className={`chat-bubble ${message.senderId===authUser._id?"bg-cyan-600 text-white":"bg-slate-800 text-slate-200"}`}>
                          {message.image && <img src={message.image} alt='Shared' className='rounded-lg h-48 object-cover'/>}
                          {message.text && <p className='mt-2'>{message.text}</p>}
                          <p className="text-xs mt-1 opacity-75">
                               {new Date(message.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                          </p>
                      </div>
                  </div>
                ))
              }
              <div ref={msgRef}></div>
            </div>
          ) 
          :isMessagesLoading?<MessagesLoadingSkeleton />:<NoChatHistoryPlaceholder name={selectedUser.fullName}/>
        }
      </div>
      <MessageInput/>
    </div>
  )
}
