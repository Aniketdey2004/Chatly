import React from 'react'
import { MessageCircleIcon } from 'lucide-react'

export default function NoContacts() {
  return (
    <div className='h-full flex flex-col pt-6 items-center gap-4'>
        <div className='w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center'>
            <MessageCircleIcon className='w-8 h-8 text-cyan-400'/>
        </div>
        <div className='text-center'>
            <h4 className='text-slate-200 font-medium mb-1'>No Such Contacts exist</h4>
        </div>
    </div>
  )
}
