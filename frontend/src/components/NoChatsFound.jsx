import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { MessageCircleIcon } from 'lucide-react';


export default function NoChatsFound() {
  const setActiveTab=useChatStore((state)=>state.setActiveTab);
  return (
    <div className='h-full flex flex-col pt-6 items-center gap-4'>
        <div className='w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center'>
            <MessageCircleIcon className='w-8 h-8 text-cyan-400'/>
        </div>
        <div className='text-center'>
            <h4 className='text-slate-200 font-medium mb-1'>No Conversations</h4>
            <p className='text-slate-400 text-sm px-6'>Start a new chat by selecting a contact from the contacts tab</p>
        </div>
        <button onClick={()=>setActiveTab("contacts")} className='px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors'>Find Contacts</button>
    </div>
  )
}
