import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../../apis";

const CardDetails = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(
                    `${SummaryApi.getFullcard.url}/${id}`,
                    {
                        method: SummaryApi.getFullcard.method,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                setCourse(data.course);
            } catch (error) {
                console.error("Failed to fetch course", error);
            }
        };

        fetchCourse();
    }, [id, token]);

    if (!course) return <p className="text-center mt-20">Loading...</p>;
    if (course.CourseStatus !== "Live")
        return <p className="text-center mt-20">Course not available</p>;

    return (
        <div className="flex flex-col lg:flex-row justify-center items-start
                        mt-28 w-full gap-10
                        px-4 sm:px-8 lg:px-28 mb-10">

            {/* RIGHT CARD (FIRST ON MOBILE) */}
            <div className="w-full lg:w-[35%] bg-white shadow-md
                            hover:shadow-lg transition rounded-lg
                            h-fit order-1 lg:order-2 sticky lg:top-28">

                <img
                    src={`http://localhost:8000${course.thumbnail}`}
                    className="w-full h-[30%] object-cover rounded-t-lg"
                    alt="Course"
                />

                <div className="p-4 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">
                        {course.title}
                    </h2>

                    <p className="text-gray-500">
                        {course.educator.name}
                    </p>

                    <p className="text-3xl font-bold">
                        ₹{course.price}
                    </p>

                    <div className="flex items-center gap-1">
                        <span className="text-orange-500 text-xl">★</span>
                        <span className="text-lg">
                            4.5 (Ratings)
                        </span>
                    </div>

                    <button className="h-10 bg-blue-600 text-white rounded
                                       hover:bg-blue-700 transition">
                        Enroll Now
                    </button>

                    <div className="mt-4">
                        <p className="text-lg font-bold text-gray-800 mb-2">
                            What's in the course?
                        </p>

                        <ul className="list-disc ml-4 text-sm text-gray-500 space-y-1">
                            <li>Lifetime access with free updates.</li>
                            <li>Step-by-step, hands-on project guidance.</li>
                            <li>Downloadable resources and source code.</li>
                            <li>Quizzes to test your knowledge.</li>
                            <li>Certificate of completion.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* LEFT CONTENT (SECOND ON MOBILE) */}
            <div className="w-full lg:w-[55%] flex flex-col gap-4 order-2 lg:order-1">
                <h2 className="text-3xl lg:text-4xl font-extrabold">
                    {course.title}
                </h2>

                <p className="text-gray-500 text-lg lg:text-xl">
                    {course.heading}
                </p>

                <div className="flex items-center gap-1 text-lg">
                    <span className="font-medium">4.5</span>
                    <span className="text-orange-500">★★★★☆</span>
                    <span className="text-gray-400">(122)</span>
                </div>

                <p className="text-lg">
                    Course By{" "}
                    <span className="text-blue-600 underline">
                        {course.educator.name}
                    </span>
                </p>

                <p className="text-xl font-bold mt-4">
                    Course Description
                </p>

                <p className="text-base lg:text-lg whitespace-pre-line text-gray-700">
                    {course.description}
                </p>
            </div>
        </div>
    );
};

export default CardDetails;
