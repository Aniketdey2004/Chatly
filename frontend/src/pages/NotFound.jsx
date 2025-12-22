import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { SearchX } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="relative w-full max-w-6xl h-[95vh] mx-4 ">
      <BorderAnimatedContainer>
        <div className='w-full h-full flex flex-col justify-center items-center gap-4 p-4'>
           <SearchX color="#40c9f7" className="size-24"/>
           <h4 className='text-2xl text-white font-medium text-center'>The page you’re looking for does not exist</h4>
           <Link to="/"><button className='text-xl text-slate-400 font-medium  bg-slate-700/50 px-2 py-4 rounded-lg hover:text-cyan-500 transition-colors'>Go to Home</button></Link>
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}
