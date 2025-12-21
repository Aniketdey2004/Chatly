import { MessageCircleIcon } from 'lucide-react'
import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { Menu } from 'lucide-react';

export default function NoConversationPlaceholder() {
  const sidebar=useChatStore((state)=>state.sidebar);
  const toggleSidebar=useChatStore((state)=>state.toggleSidebar);
  return (
    <div className='h-full relative flex flex-col justify-center items-center gap-3 p-4'>
       {!sidebar && <Menu onClick={toggleSidebar} className='absolute top-10 left-10 w-8 h-8 cursor-pointer text-slate-500/70 hover:text-slate-200/80 transition-colors
                      '/>}
        <div className='w-20 h-20 bg-cyan-500/10 flex justify-center items-center rounded-full'>
          <MessageCircleIcon className='w-10 h-10 text-cyan-400'/>
        </div>
        <h3 className='text-xl font-semibold text-slate-200'>Select a conversation</h3>
        <p className='text-slate-200 max-w-md text-center'>Choose a contact from the sidebar to start chatting or continue a previous conversation</p>
    </div>
  )
}
