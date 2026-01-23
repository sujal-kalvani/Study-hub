import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SummaryApi from '../../apis'

const StudentEnrolled = () => {

  const [students, SetStudents] = useState([])
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(SummaryApi.EnrolledStudent.url, {
          method: SummaryApi.EnrolledStudent.method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log(data);
        SetStudents(data.enrollments)


      } catch (error) {
        console.error("Failed to fetch courses");
      }
    };

    fetchStudents();

  }, [])

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

  return (
     <div>

      <div>
        <table className="min-w-96 w-full border-collapse border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white h-14 font-bold text-center rounded">
              <th>#</th>
              <th>Student Name</th>
              <th>Course Title</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="hover:bg-blue-100 border-b border-gray-200 h-full text-center"
                >
                  <td className="px-4 py-2 font-medium">
                    {index + 1}
                  </td>

                  <td className='flex justify-center items-center mt-3 gap-2 mb-2'>
                    <img
                      src={`http://localhost:8000${student.user.profileImage}`}
                      alt="Student Profile"
                      className="w-10 h-10 rounded-full "
                    />
                    {student.user.name}


                  </td>

                  <td className="px-4 py-2">
                    {student.course.title}
                  </td>
                  <td className="px-4 py-2">
                    {formatDate(student.enrolledAt)}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Students Enrolled
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentEnrolled


// Filtered Enrollments: [
//   {
//     _id: new ObjectId('695689f1a775360899fd2586'),
//     user: {
//       _id: new ObjectId('69563fd8dd9cbab4ac5328c7'),
//       name: 'sujal kalvani',
//       email: 'sujalkalvani@gmail.com',
//       password: '$2b$10$dNwi/1YEgqORuNOqgCAereMtmXyzOYLEqbvE3SE3C6qz92zZKv3rK',
//       otp: null,
//       otpExpiresAt: null,
//       role: 'student',
//       profileImage: '/images/profile/1767260155212-243002501.jpg',
//       enrolledCourses: [],
//       createdCourses: [],
//       createdAt: 2026-01-01T09:35:20.662Z,
//       updatedAt: 2026-01-01T09:35:55.245Z,
//       __v: 0
//     },
//     course: {
//       _id: new ObjectId('695516dc1194616431bce0b8'),
//       title: 'Mern Stack Web Development',
//       price: 5000
//     },
//     paymentStatus: 'paid',
//     paymentMode: 'online',
//     amountPaid: 5000,
//     progress: 0,
//     completed: false,
//     stripeSessionId: 'cs_test_a1mG0jIFBJQjEhAdoVSHdS7zVauRy3FF0udmh83NcTdO71cHY7DgJIrHXK',
//     paymentIntentId: 'pi_3SknEFP6E66WSd5I0sku20ZX',
//     enrolledAt: 2026-01-01T14:51:29.373Z,
//     createdAt: 2026-01-01T14:51:29.380Z,
//     updatedAt: 2026-01-01T14:51:29.380Z,
//     __v: 0
//   }
// ]
// Filtered Enrollments: [
//   {
//     _id: new ObjectId('695689f1a775360899fd2586'),
//     user: {
//       _id: new ObjectId('69563fd8dd9cbab4ac5328c7'),
//       name: 'sujal kalvani',
//       email: 'sujalkalvani@gmail.com',
//       password: '$2b$10$dNwi/1YEgqORuNOqgCAereMtmXyzOYLEqbvE3SE3C6qz92zZKv3rK',
//       otp: null,
//       otpExpiresAt: null,
//       role: 'student',
//       profileImage: '/images/profile/1767260155212-243002501.jpg',
//       enrolledCourses: [],
//       createdCourses: [],
//       createdAt: 2026-01-01T09:35:20.662Z,
//       updatedAt: 2026-01-01T09:35:55.245Z,
//       __v: 0
//     },
//     course: {
//       _id: new ObjectId('695516dc1194616431bce0b8'),
//       title: 'Mern Stack Web Development',
//       price: 5000
//     },
//     paymentStatus: 'paid',
//     paymentMode: 'online',
//     amountPaid: 5000,
//     progress: 0,
//     completed: false,
//     stripeSessionId: 'cs_test_a1mG0jIFBJQjEhAdoVSHdS7zVauRy3FF0udmh83NcTdO71cHY7DgJIrHXK',
//     paymentIntentId: 'pi_3SknEFP6E66WSd5I0sku20ZX',
//     enrolledAt: 2026-01-01T14:51:29.373Z,
//     createdAt: 2026-01-01T14:51:29.380Z,
//     updatedAt: 2026-01-01T14:51:29.380Z,
//     __v: 0
//   }
// ]
// Filtered Enrollments: [
//   {
//     _id: new ObjectId('695689f1a775360899fd2586'),
//     user: {
//       _id: new ObjectId('69563fd8dd9cbab4ac5328c7'),
//       name: 'sujal kalvani',
//       email: 'sujalkalvani@gmail.com',
//       password: '$2b$10$dNwi/1YEgqORuNOqgCAereMtmXyzOYLEqbvE3SE3C6qz92zZKv3rK',
//       otp: null,
//       otpExpiresAt: null,
//       role: 'student',
//       profileImage: '/images/profile/1767260155212-243002501.jpg',
//       enrolledCourses: [],
//       createdCourses: [],
//       createdAt: 2026-01-01T09:35:20.662Z,
//       updatedAt: 2026-01-01T09:35:55.245Z,
//       __v: 0
//     },
//     course: {
//       _id: new ObjectId('695516dc1194616431bce0b8'),
//       title: 'Mern Stack Web Development',
//       price: 5000
//     },
//     paymentStatus: 'paid',
//     paymentMode: 'online',
//     amountPaid: 5000,
//     progress: 0,
//     completed: false,
//     stripeSessionId: 'cs_test_a1mG0jIFBJQjEhAdoVSHdS7zVauRy3FF0udmh83NcTdO71cHY7DgJIrHXK',
//     paymentIntentId: 'pi_3SknEFP6E66WSd5I0sku20ZX',
//     enrolledAt: 2026-01-01T14:51:29.373Z,
//     createdAt: 2026-01-01T14:51:29.380Z,
//     updatedAt: 2026-01-01T14:51:29.380Z,
//     __v: 0
//   }