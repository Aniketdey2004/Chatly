import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { XIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Menu } from 'lucide-react';

export default function ChatHeader() {
    const selectedUser=useChatStore((state)=>state.selectedUser);
    const setSelectedUser=useChatStore((state)=>state.setSelectedUser);
    const sidebar=useChatStore((state)=>state.sidebar);
    const toggleSidebar=useChatStore((state)=>state.toggleSidebar);
    const onlineUsers=useAuthStore((state)=>state.onlineUsers);
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        }
        window.addEventListener("keydown", handleEscKey);

        return () => {
            window.removeEventListener("keydown", handleEscKey);
        }
    }, [setSelectedUser]);


    return (
        <div className='h-16 flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 px-4 md:px-6'>
            <div className='flex items-center space-x-3'>
                {!sidebar && <Menu onClick={toggleSidebar} className='w-8 h-8 cursor-pointer text-slate-500/70 hover:text-slate-200/80 transition-colors
                '/>}
                <div className={`avatar ${onlineUsers.includes(selectedUser._id.toString())?"online":"offline"}`}>
                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                        <img src={selectedUser.profilePic || './avatar.png'} alt={selectedUser.fullName} />
                    </div>
                </div>
                <div>
                    <h3 className='text-slate-200 font-medium'>{selectedUser.fullName}</h3>
                    <p className='text-slate-400 text-sm'>{onlineUsers.includes(selectedUser._id.toString())?"online":"offline"}</p>
                </div>
            </div>
            <button onClick={()=>setSelectedUser(null)}>
                <XIcon className='w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer'/>
            </button>
        </div>
    )
}
