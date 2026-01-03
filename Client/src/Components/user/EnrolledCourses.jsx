import React, { useEffect, useState } from 'react'
import SummaryApi from '../../apis'
import { toast } from 'react-toastify'
import { Outlet ,useNavigate} from 'react-router-dom'

const EnrolledCourses = () => {
  const token = localStorage.getItem('token')
  const navigate=useNavigate()

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(SummaryApi.getEnrolledCourses.url, {
          method: SummaryApi.getEnrolledCourses.method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch courses')
        }

        setCourses(data.courses)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) getCourses()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading your enrollments...
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-20 px-4">
      <p className="text-3xl font-bold text-center mb-6">
        My Enrollments
      </p>

      <div className="min-w-full overflow-scroll TABLE">
        <table className="w-[1200px]  mx-auto border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white h-14 text-center">
              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Sr.</th>
              <th>Thumbnail</th>
              <th>Course</th>
              <th>Amount Paid</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((item, index) => (
                <tr 
                  className=" hover:bg-blue-50 text-center cursor-pointer"
                  onClick={()=>navigate(`/Course-tutorial/${item.course._id}`)}
                  key={item._id}
                  >
                  <td className="py-3 font-medium text-center">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{index + 1}
                  </td>

                  <td className="py-3 flex justify-center">
                    <img
                      src={`http://localhost:8000${item.course.thumbnail}`}
                      alt={item.course.title}
                      className="w-28 h-20 object-cover "
                    />
                  </td>

                  <td className="py-3 font-semibold">
                    {item.course.title}
                  </td>

                  <td className="py-3">
                    ₹{item.amountPaid}
                  </td>

                  <td className="py-3">
                    {item.progress}%
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${item.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                        }`}
                        >
                      {item.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No enrolled courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      <Outlet/>
      </div>
    </div>
  )
}

export default EnrolledCourses
