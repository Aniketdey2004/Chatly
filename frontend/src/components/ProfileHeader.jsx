import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';
import {LogOut, VolumeOff, Volume2, XIcon} from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

export default function ProfileHeader() {
  const logout=useAuthStore((state)=>state.logout);
  const authUser=useAuthStore((state)=>state.authUser);
  const updateProfile=useAuthStore((state)=>state.updateProfile);
  const isSoundEnabled=useChatStore((state)=>state.isSoundEnabled);
  const toggleSound=useChatStore((state)=>state.toggleSound);
  const toggleSidebar=useChatStore((state)=>state.toggleSidebar);
  
  const [selectedImg,setSelectedImg]=useState(null);

  const fileInputRef=useRef(null);

  const handleImageUpload=(e)=>{
      const file=e.target.files[0];
      if(!file) return;

      const reader= new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend= async()=>{
        const base64Image= reader.result;
        setSelectedImg(base64Image);
        await updateProfile({profilePic: base64Image});
      };
  };

  return (
    <div className='p-6 border-b border-slate-700/50 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
            {/*Avatar*/}
            <div className='avatar online'>
              <button className='size-14 rounded-full overflow-hidden relative group' onClick={()=>fileInputRef.current.click()}>
                  <img src={selectedImg|| authUser.profilePic || "/avatar.png"} alt='user image' className='size-full object-cover'/>
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center'>
                    <span className='text-xs font-medium text-white'>Change</span>
                  </div>
              </button>
              <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageUpload} className='hidden'/>
            </div>
            {/*Username and status*/}
            <div>
              <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>{authUser.fullName}</h3>
              <p className='text-slate-400 text-xs'>Online</p>
            </div>
        </div>
        {/*Buttons*/}
        <div className='flex items-center gap-4'>
          {/*Logout btns*/ }
          <button className='text-slate-400 hover:text-slate-200 transition-colors' onClick={logout}>
            <LogOut className='size-5'/>
          </button>
          {/*sound buttons*/ }
          <button className='text-slate-400 hover:text-slate-200 transition-colors' onClick={()=>{
            mouseClickSound.currentTime=0;
            mouseClickSound.play().catch((error)=>console.log("Unable to play sound",error));
            toggleSound();
          }}>
              {
                isSoundEnabled? <Volume2 className='size-5'/>:<VolumeOff className='size-5'/>
              }
          </button>
          <button onClick={toggleSidebar}>
                <XIcon className='w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer'/>
          </button>
        </div>
    </div>
  )
}
