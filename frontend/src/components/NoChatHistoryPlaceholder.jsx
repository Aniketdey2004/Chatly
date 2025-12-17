import { MessageCircleIcon } from 'lucide-react'
import React from 'react'

export default function NoChatHistoryPlaceholder({name}) {
  return (
    <div className='h-full flex flex-col justify-center items-center gap-4'>
        <div className='w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 rounded-full flex justify-center items-center'>
            <MessageCircleIcon className='w-12 h-12 text-cyan-400'/>
        </div>
        <h3 className='text-xl font-medium  text-slate-200'>Start your conversation with {name}</h3>
        <p className='text-slate-200 text-sm'>This is the beginning of your conversation. Send a message to start chatting!</p>
        <div className='flex justify-center gap-8'>
            <button className='text-sm font-medium bg-cyan-500/20  text-cyan-400 px-4 py-1 rounded-2xl hover:bg-cyan-500/20 transition-colors'>👋 Say Hello</button>
            <button className='text-sm font-medium bg-cyan-500/20  text-cyan-400 px-4 py-1 rounded-2xl hover:bg-cyan-500/20 transition-colors'>🤝 How are you?</button>
            <button className='text-sm font-medium bg-cyan-500/20  text-cyan-400 px-4 py-1 rounded-2xl hover:bg-cyan-500/20 transition-colors'>📅 Meet up soon?</button>
        </div>
    </div>
  )
}
