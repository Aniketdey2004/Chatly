import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound'
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react';


export default function MessageInput() {
  const { playRandomKeyboardSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !image)
      return;
    if (isSoundEnabled)
      playRandomKeyboardSound();
    console.log(text);
    sendMessage({ text: text.trim(), image });
    setText("");
    setImage("");
    fileInputRef.current.value = "";
  }

  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Select an image file");
      return;
    }

    const reader=new FileReader();
    reader.onloadend=()=>{setImage(reader.result)};
    reader.readAsDataURL(file);
  }

  const removeImage=()=>{
    setImage("");
    fileInputRef.current.value = "";
  }
  return (
    <div className='p-4 border-t border-slate-700/50'>
      {image && (
        <div className='max-w-3xl mx-auto mb-3 flex'>
          <div className='relative'>
              <img src={image} alt='preview image' className='h-20 w-20 rounded-lg border border-slate-700'/>
              <button className='absolute -top-2 -right-2 bg-slate-700 text-white rounded-full p-1' onClick={removeImage}>
                <XIcon className='h-4 w-4'/>
              </button>
          </div>
        </div>
      )}
        <form onSubmit={handleSendMessage} className='max-w-3xl mx-auto space-x-4 flex'>
            <input type='text' placeholder='Type your message...' onChange={(e)=>{
              setText(e.target.value);
              isSoundEnabled && playRandomKeyboardSound(); 
            }} value={text} className='flex-1 bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-700/50 focus:border-cyan-500
    focus:ring-2 focus:ring-cyan-500
    focus:outline-none'/>
            <input type='file' ref={fileInputRef} accept='image/*' onChange={handleImageChange} className='hidden'/>
            <button onClick={()=>{
                  fileInputRef.current.click();
                }
              } type='button' className={`bg-slate-800/50 ${image?"text-cyan-500":"text-slate-400"} hover:text-slate-200 rounded-lg px-4 transition-colors`}>
                <ImageIcon className='w-5 h-5'/>
            </button>
            <button type='submit' disabled={!text.trim() && !image} className='bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
                <SendIcon className='w-5 h-5'/>
            </button>
        </form>
    </div>
  )
}
