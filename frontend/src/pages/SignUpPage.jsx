import React, { useState } from 'react'
import {useAuthStore} from "../store/useAuthStore.js";
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx';
import { LockIcon, MailIcon, MessageCircleIcon , UserIcon} from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';
import {Link} from "react-router";

export default function SignUpPage() {
  const [formData, setFormData]=useState({fullName:"",email:"",password:""});
  const signup=useAuthStore((state)=>state.signup);
  const isSigningUp=useAuthStore((state)=>state.isSigningUp);

  const handleSubmit=(e)=>{
    e.preventDefault();
    signup(formData);
  };

  return (
       <div className="relative w-full max-w-6xl md:h-[750px] h-[630px] mx-4">
          <BorderAnimatedContainer>
            {/* <div className='w-full flex  md:flex-row'> */}
                {/*FORM COLUMN left side*/}
                <div className='w-full md:w-1/2 p-8 flex flex-col justify-center md:border-r border-slate-600/30'>
                        {/*heading text */}
                        <div className="w-full text-center mb-8">
                          <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4'/>
                          <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                          <p className="text-slate-400">Sign up for a new account</p>
                        </div>
                        {/* FORM */}
                        <form onSubmit={handleSubmit} className='w-full space-y-6'>
                              {/* FULL NAME */}
                              <div>
                                <label htmlFor='fullName' className='auth-input-label'>Full Name</label>
                                <div className='relative'>
                                    <UserIcon className="auth-input-icon" />
                                    <input type='text' value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} id='fullName' className="input"
                                      placeholder="John Doe"/>
                                </div>
                              </div>
                              {/* EMAIL INPUT */}
                              <div>
                                <label htmlFor='email' className='auth-input-label'>Email</label>
                                <div className='relative'>
                                    <MailIcon className="auth-input-icon" />
                                    <input type='text' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className="input"
                                      placeholder="johndoe@gmail.com" id="email"/>
                                </div>
                              </div>
                              {/* PASSWORD INPUT */}
                              <div>
                                <label htmlFor='password' className='auth-input-label'>Password</label>
                                <div className='relative'>
                                    <LockIcon className="auth-input-icon" />
                                    <input type='text' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}  className="input"
                                      placeholder="Enter your password"/>
                                </div>
                              </div>
                              {/*Submit button*/}
                              <button className='auth-btn' type='submit' disabled={isSigningUp}>
                                  {isSigningUp? <LoaderIcon className='w-full h-10 animate-spin mx-auto'/>:"Create Account"}
                              </button>
                        </form>
                        <div className="mt-6 text-center">
                            <Link to="/login" className="auth-link">
                                Already have an account? Login
                            </Link>
                        </div>
                </div>
                {/*Right side column*/}
                <div className='hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>
                    <div>
                      <img src="/signup.png" alt='signup image' className='w-full h-auto'/>
                      <div className='mt-6 text-center'>
                        <h3 className='text-xl font-medium text-cyan-400'>Start Your Journey Today</h3>      
                        <div className='mt-4 flex justify-center gap-4'>
                          <span className="auth-badge">Free</span>
                          <span className="auth-badge">Easy Setup</span>
                          <span className="auth-badge">Private</span>
                        </div>                
                      </div>
                    </div>
                </div>
            {/* </div> */}
          </BorderAnimatedContainer>
       </div>
   
  )
}
