import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatsFound from './NoChatsFound';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import { useAuthStore } from '../store/useAuthStore.js';
import { Search, XIcon } from 'lucide-react';

export default function ChatsList() {
  const chats = useChatStore((state) => state.chats);
  const getMyChatPartners = useChatStore((state) => state.getMyChatPartners);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const onlineUsers = useAuthStore((state) => state.onlineUsers);
  const filterChatPartners=useChatStore((state)=>state.filterChatPartners);

  const [search, setSearch] = useState("");
  const [searched,setSearched]=useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    filterChatPartners(search);
  }

  const handleCancel=(e)=>{
    e.preventDefault();
    setSearch("");
    setSearched(false);
    getMyChatPartners();
  };
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // if (chats.length == 0) return <NoChatsFound />
  return (
    <>
      <form onSubmit={searched?handleCancel:handleSubmit} className='mx-auto space-x-4 relative'>
        <input type='text' value={search} onChange={(e) => !searched?setSearch(e.target.value):null} placeholder='Search' className='bg-slate-800/50 pl-4 pr-11 py-2 border border-slate-700/50 focus:border-cyan-500
          focus:ring-2 focus:ring-cyan-500 focus:outline-none rounded-2xl w-full'/>
        <button type='submit' className='absolute right-4 top-2'>
          {searched?<XIcon/>:<Search />}
        </button>
      </form>
      {chats.length>0?(
        chats.map((chat) => (
          <div key={chat._id} className='bg-cyan-500/5 p-3 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors' onClick={() => setSelectedUser(chat)}>
            <div className='flex items-center gap-3'>
              {/*TODO fix this with socket server everyone is being shown online now*/}
              <div className={`avatar ${onlineUsers.includes(chat._id.toString()) ? "online" : "offline"}`}>
                <div className='size-12 rounded-full'>
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className='size-full object-cover' />
                </div>
              </div>
              <div className='text-slate-200 font-medium truncate'>{chat.fullName}</div>
            </div>
          </div>
        ))):<NoChatsFound/>
      }
    </>
  )
}
