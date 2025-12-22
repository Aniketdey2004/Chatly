import React from 'react'
import {useEffect,useState} from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import {useChatStore} from "../store/useChatStore.js";
import { useAuthStore } from '../store/useAuthStore.js';
import { Search, XIcon } from 'lucide-react';
import NoContacts from './NoContacts.jsx';

export default function ContactList() {
  const allContacts=useChatStore((state)=>state.allContacts);
  const getAllContacts=useChatStore((state)=>state.getAllContacts);
  const isUsersLoading=useChatStore((state)=>state.isUsersLoading);
  const setSelectedUser=useChatStore((state)=>state.setSelectedUser);
  const onlineUsers=useAuthStore((state)=>state.onlineUsers);
  const filterContacts=useChatStore((state)=>state.filterContacts);
  
  const [search, setSearch] = useState("");
  const [searched,setSearched]=useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    filterContacts(search);
  }
  
  const handleCancel=(e)=>{
    e.preventDefault();
    setSearch("");
    setSearched(false);
    getAllContacts();
  };

  useEffect(()=>{
    getAllContacts();
  },[getAllContacts]);

  if(isUsersLoading) return <UsersLoadingSkeleton/>;

  return (
    <>
      <form onSubmit={searched?handleCancel:handleSubmit} className='mx-auto space-x-4 relative'>
        <input type='text' value={search} onChange={(e) => !searched?setSearch(e.target.value):null} placeholder='Search' className='bg-slate-800/50 pl-4 pr-11 py-2 border border-slate-700/50 focus:border-cyan-500
          focus:ring-2 focus:ring-cyan-500 focus:outline-none rounded-2xl w-full'/>
        <button type='submit' className='absolute right-4 top-2'>
          {searched?<XIcon/>:<Search />}
        </button>
      </form>
      {
        allContacts.length>0?(
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
        
        ))):<NoContacts/>
      }
    </>
  )
}
