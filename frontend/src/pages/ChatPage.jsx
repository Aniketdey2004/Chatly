import React from 'react'
import { useChatStore } from '../store/useChatStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatsList from '../components/ChatsList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';

export default function ChatPage() {
  const activeTab=useChatStore((state)=>state.activeTab);
  const selectedUser=useChatStore((state)=>state.selectedUser);
  const sidebar=useChatStore((state)=>state.sidebar);

  return (
    <div className='relative w-full max-w-6xl md:h-[750px] h-[630px]'>
      {/* <div className='px-4'> */}
      <BorderAnimatedContainer>
        {/*Left Section*/}
          <div className={`
            ${sidebar ? "w-80 md:w-96" : "hidden"}
           bg-slate-800/50 backdrop-blur-sm
            flex flex-col
            absolute  top-0 bottom-0 left-0 z-50
            rounded-l-2xl md:rounded-none
            md:relative md:z-auto
          `}>
          <ProfileHeader />
          <ActiveTabSwitch/>
          <div className='flex-1 space-y-2 overflow-y-auto p-6'>
              {activeTab==="chats"?<ChatsList/>:<ContactList/>}
          </div>
        </div>
        {/*RightSection*/}
        <div className='flex-1 bg-slate-900/50 backdrop-blur-sm'>
          {selectedUser?<ChatContainer/>:<NoConversationPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
    // </div>
  )
}
