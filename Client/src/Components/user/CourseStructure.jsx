import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../../apis'
import { MdOutlineArrowDropDown } from "react-icons/md"
import { CgPlayButtonO } from "react-icons/cg"
import { IoClose } from "react-icons/io5"

const CourseStructure = () => {
  const { id } = useParams()

  const [chapters, setChapters] = useState([])
  const [openIndex, setOpenIndex] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        if (!id) return

        const response = await fetch(
          `${SummaryApi.getTutorials.url}/${id}`,
          { method: SummaryApi.getTutorials.method }
        )

        const data = await response.json()
        setChapters(data.chapters || [])
      } catch (error) {
        console.error("Failed to fetch chapters", error)
      }
    }

    fetchChapters()
  }, [id])

  const toggleChapter = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // 🔹 Convert YouTube URL → Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return ""

    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1].split("?")[0]
      return `https://www.youtube.com/embed/${id}`
    }

    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1].split("&")[0]
      return `https://www.youtube.com/embed/${id}`
    }

    if (url.includes("/embed/")) return url

    return ""
  }

  return (
    <div className="min-h-screen mt-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Course Structure</h2>

      {chapters.length > 0 ? (
        chapters.map((chapter, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={chapter._id}
              className="border rounded-md mb-3 overflow-hidden"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 h-20 cursor-pointer bg-white"
                onClick={() => toggleChapter(index)}
              >
                <div className="flex items-center gap-0">
                  <MdOutlineArrowDropDown
                    className={`w-8 h-8 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                  <p className="font-semibold md:text-xl">
                    Chapter {index + 1}: {chapter.title}
                  </p>
                </div>

                <span className="text-sm text-blue-700">
                  {chapter.duration}
                </span>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ml-5
                  ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div
                  className="px-6 py-3 flex items-center gap-3 text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setActiveVideo(chapter.youtubeUrl)}
                >
                  <CgPlayButtonO className="w-6 h-6" />
                  <span>Watch Lecture</span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p className="text-gray-500">No chapters found</p>
      )}

      {/* ================= FIXED VIDEO PLAYER ================= */}
      {activeVideo && (
        // <div className="fixed inset-0 bg-black opacity-50 z-40 flex items-center justify-center">
        <div className="fixed inset-0 z-40 flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative w-full max-w-4xl px-4 z-50">
            
            {/* Close Button */}
            <button
              className="absolute -top-10 right-5 text-white text-3xl"
              onClick={() => setActiveVideo(null)}
            >
              <IoClose className='cursor-pointer' />
            </button>

            {/* Video */}
            <iframe
              className="w-full h-[315px] md:h-[450px] rounded-lg"
              src={getEmbedUrl(activeVideo)}
              title="Course Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseStructure
