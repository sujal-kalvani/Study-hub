import React, { useEffect, useState } from 'react';
import SummaryApi from '../../apis';

const MyCourses = () => {

  const token = localStorage.getItem("token");
  const [courses, SetCourses] = useState([]);

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
        SetCourses(data.user.createdCourses);
      } catch (error) {
        console.error("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, [token]);

  const courseToggle = async (courseId) => {
    try {
      const response = await fetch(SummaryApi.courseStatusToggle.url, {
        method: SummaryApi.courseStatusToggle.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (data.success) {
        // 🔑 Update state for animation
        SetCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === courseId
              ? {
                  ...course,
                  CourseStatus:
                    course.CourseStatus === "Live" ? "Private" : "Live",
                }
              : course
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle course status");
    }
  };

  return (
    <div>
      <p className="font-semibold text-lg mb-3">My Courses</p>

      <div>
        <table className="w-full border-collapse border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white h-14 font-bold text-center">
              <th>Sr.</th>
              <th>All Courses</th>
              <th>Earnings</th>
              <th>Students</th>
              <th>Course Status</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr
                  key={course._id}
                  className="hover:bg-blue-100 border-b border-gray-200 h-12 text-center"
                >
                  <td className="px-4 py-2 font-medium">
                    {index + 1}
                  </td>

                  <td className="px-4 py-2">
                    {course.heading}
                  </td>

                  <td className="px-4 py-2">
                    {course.Earnings}
                  </td>

                  <td className="px-4 py-2">
                    {course.studentEnrolled}
                  </td>

                  <td className="px-4 py-2 flex justify-center gap-3 items-center">
                    {/* TOGGLE BUTTON */}
                    <button
                      onClick={() => courseToggle(course._id)}
                      className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300
                      ${course.CourseStatus === "Live"
                        ? "bg-blue-600"
                        : "bg-gray-300"}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                        ${course.CourseStatus === "Private"
                          ? "translate-x-7"
                          : "translate-x-0"}`}
                      />
                    </button>

                    {/* STATUS BADGE */}
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium
                      ${course.CourseStatus === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}
                    >
                      {course.CourseStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCourses;
