import React from 'react'
import Lenarners from '../Components/Lenarners'

const Home = () => {
  return (
    <div className='h-screen mt-20 flex flex-col justify-center items-center gap-8'>

      <div className='w-[50%] flex justify-between'>

        <h1 class="md:text-5xl relative font-extrabold text-gray-800 max-w-4xl mx-auto">&nbsp; &nbsp; Empower your future with the courses designed to<span class="text-blue-600"> fit your choice.</span></h1></div>

        <p class="text-gray-500 max-w-2xl mx-auto">We bring together world-class instructors, interactive content, and a supportive community to help <br/>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you achieve your personal and professional goals.</p>

        <div className='relative border border-gray-300 w-[35%] h-14 flex pl-12'>

          <svg className='absolute left-3 top-4' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.3828 12.3828L17.1408 17.1415" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.4451 13.6915C13.5634 12.3662 15.0169 8.7641 13.6917 5.64585C12.3665 2.52761 8.76432 1.07408 5.64608 2.3993C2.52783 3.72452 1.0743 7.32666 2.39953 10.4449C3.72475 13.5631 7.32688 15.0167 10.4451 13.6915Z" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>

          <input type="search" name="courses" id="courses" placeholder='Search for courses' className='border-none outline-none focus:ring-0 hover:border-none w-full h-full'/>

          <button className='bg-blue-600 text-white w-[30%] cursor-pointer'>Search</button>

        </div>
          <Lenarners/>

      </div>
  )
}

export default Home