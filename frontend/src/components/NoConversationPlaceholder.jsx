import { MessageCircleIcon } from 'lucide-react'
import React from 'react'

export default function NoConversationPlaceholder() {
  return (
    <div className='h-full flex flex-col justify-center items-center gap-3'>
        <div className='w-20 h-20 bg-cyan-500/10 flex justify-center items-center rounded-full'>
          <MessageCircleIcon className='w-10 h-10 text-cyan-400'/>
        </div>
        <h3 className='text-xl font-semibold text-slate-200'>Select a conversation</h3>
        <p className='text-slate-200 max-w-md text-center'>Choose a contact from the sidebar to start chatting or continue a previous conversation</p>
    </div>
  )
}
