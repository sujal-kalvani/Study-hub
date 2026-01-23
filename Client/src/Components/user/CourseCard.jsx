import React, { useEffect, useState } from "react";
import SummaryApi from "../../apis";
import { Link } from "react-router-dom";

const CourseCard = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(SummaryApi.getAllCourses.url, {
          method: SummaryApi.getAllCourses.method,
        });

        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, [token]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`${
          i < Math.round(rating)
            ? "text-orange-500"
            : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold">Learn from the best</p>

      <div className="flex flex-wrap gap-6 mt-10 justify-center mb-10">
        {courses.map(
          (course) =>
            course.CourseStatus === "Live" && (
              <Link to={`/course-card/${course._id}`} key={course._id}>
                <div className="w-80 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                  {/* Thumbnail */}
                  <img
                    src={`http://localhost:8000${course.thumbnail}`}
                    alt="Course Thumbnail"
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900 text-left">
                      {course.title}
                    </h2>

                    {/* Ratings */}
                    {course.ratings?.length > 0 ? (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">
                          {course.averageRating.toFixed(1)}
                        </span>

                        <div className="flex">
                          {renderStars(course.averageRating)}
                        </div>

                        <span className="text-gray-400">
                          ({course.ratings.length})
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No ratings yet
                      </p>
                    )}

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-900 text-left">
                      ₹{course.price}
                    </p>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default CourseCard;
