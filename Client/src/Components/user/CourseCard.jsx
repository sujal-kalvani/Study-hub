import React, { useEffect, useState } from "react";
import SummaryApi from "../../apis";
import { Link } from "react-router-dom";

const CourseCard = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [educator, setEducator] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(SummaryApi.getCourses.url, {
          method: SummaryApi.getCourses.method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCourses(data.user.createdCourses);
        setEducator(data.user.name);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, [token]);

  // console.log(courses);


  return (
    <>
      <div className="flex flex-col">
        <p className="text-3xl font-bold">Learn from the best</p>
        <div className="flex flex-wrap gap-6 mt-10 justify-center mb-10">
          {courses.map((course, index) => (
            course.CourseStatus==="Live"&& 
            <Link to={`/course-card/${course._id}`} key={course._id}>
            <div>
            <div   
              className="w-80 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={`http://localhost:8000${course.thumbnail}`}
                  alt="Course Thumbnail"
                  className="w-full h-48 object-cover rounded-t-2xl"
                  />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 text-left">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-500 text-left">
                  {educator}
                </p>

                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">4.5</span>
                  <span className="text-orange-500">★★★★☆</span>
                  <span className="text-gray-400">(122)</span>
                </div>

                <p className="text-xl font-bold text-gray-900 text-left">
                  ₹{course.price}
                </p>
              </div>
            </div>
            </div>
          </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCard;
