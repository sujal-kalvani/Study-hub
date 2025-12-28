import React from 'react'
import Lenarners from '../Components/Lenarners'
import CourseCard from '../Components/user/CourseCard';

const Home = () => {

  return (
    <div className="min-h-screen px-4 flex flex-col items-center gap-8 text-center mt-48">

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 max-w-4xl">
        Empower your future with the courses designed to
        <span className="text-blue-600"> fit your choice.</span>
      </h1>

      {/* Description */}
      <p className="text-gray-500 max-w-2xl">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional goals.
      </p>

      {/* Search Bar */}
      <div className="relative border border-gray-300 w-full sm:w-[80%] md:w-[50%] h-14 flex rounded-sm overflow-hidden">

        {/* Icon */}
        <svg
          className="absolute left-3 top-4"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M12.3828 12.3828L17.1408 17.1415"
            stroke="#7A7B7D"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4451 13.6915C13.5634 12.3662 15.0169 8.7641 13.6917 5.64585C12.3665 2.52761 8.76432 1.07408 5.64608 2.3993C2.52783 3.72452 1.0743 7.32666 2.39953 10.4449C3.72475 13.5631 7.32688 15.0167 10.4451 13.6915Z"
            stroke="#7A7B7D"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="search"
          placeholder="Search for courses"
          className="pl-10 w-full outline-none"
        />

        <button className="bg-blue-600 text-white px-6">
          Search
        </button>
      </div>

      {/* Learners Section */}
      <Lenarners />

    {/* Course Cards */}

      <CourseCard/>
    </div>
  )
}

export default Home
