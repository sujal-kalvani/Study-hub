import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../../apis";
import { CgPlayButtonO } from "react-icons/cg";
import { toast } from "react-toastify";

const CardDetails = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    // console.log(token);

    const [course, setCourse] = useState(null);
    const [video, setVideo] = useState(false);
    const [loading, setLoading] = useState(false);

    const videoRef = useRef(null);

    // 🔹 Convert YouTube URL to EMBED URL
    const getEmbedUrl = (url) => {
        if (!url) return "";

        if (url.includes("youtu.be")) {
            const id = url.split("youtu.be/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        if (url.includes("watch?v=")) {
            const id = url.split("v=")[1].split("&")[0];
            return `https://www.youtube.com/embed/${id}`;
        }

        if (url.includes("/embed/")) {
            return url;
        }

        return "";
    };

    // 🔹 Fetch Course
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (!id) return;

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

    // 🔹 Stripe Checkout (NEW FLOW)
    const payment = async () => {
        try {
            setLoading(true);

            const response = await fetch(SummaryApi.onlinePayment.url, {
                method: SummaryApi.onlinePayment.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    course: course,
                }),
            });

            const session = await response.json();

            if (!response.ok || !session.url) {
                throw new Error(session.message || "Payment failed");
            }

            window.location.href = session.url;

        } catch (error) {
            console.error("Payment Error:", error.message);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!course) return <p className="text-center mt-20">Loading...</p>;

    if (course.CourseStatus !== "Live")
        return <p className="text-center mt-20">Course not available</p>;

    return (
        <div className="flex flex-col lg:flex-row justify-center items-start mt-28 w-full gap-10 px-4 sm:px-8 lg:px-28 mb-10">

            {/* RIGHT CARD */}
            <div
                ref={videoRef}
                className="w-full lg:w-[35%] bg-white shadow-md hover:shadow-lg transition rounded-lg h-fit order-1 lg:order-2 sticky lg:top-28">

                <div className="relative flex justify-center items-center">
                    {video ? (
                        <iframe
                            className="w-full rounded-t-lg"
                            height="315"
                            src={getEmbedUrl(course.previewUrl)}
                            title="YouTube video player"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img
                            src={`http://localhost:8000${course.thumbnail}`}
                            className="w-full h-[30%] object-cover rounded-t-lg"
                            alt="Course"
                        />
                    )}
                </div>

                <div className="p-4 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">{course.title}</h2>
                    <p className="text-gray-500">{course.educator.name}</p>
                    <p className="text-3xl font-bold">₹{course.price}</p>

                    <div className="flex items-center gap-1"> <span className="text-orange-500 text-xl">★</span> <span className="text-lg">4.5 (Ratings)</span> </div>
                    <button
                        disabled={loading}
                        onClick={payment}
                        className={`h-10 text-white rounded transition
                            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Redirecting..." : "Enroll Now"}
                    </button>
                <div class="pt-6"><p class="md:text-xl text-lg font-medium text-gray-800">What's in the course?</p><ul class="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500"><li>Lifetime access with free updates.</li><li>Step-by-step, hands-on project guidance.</li><li>Downloadable resources and source code.</li><li>Quizzes to test your knowledge.</li><li>Certificate of completion.</li></ul></div>
                </div>

            </div>

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-[55%] flex flex-col gap-4 order-2 lg:order-1">
                <h2 className="text-3xl lg:text-4xl font-extrabold">{course.title}</h2>
                <p className="text-gray-500 text-lg">{course.heading}</p>

                <div className="flex items-center gap-1 text-lg">
                    <span className="font-medium">4.5</span>
                    <span className="text-orange-500">★★★★☆</span>
                </div>

                <p className="text-lg">
                    Course By <span className="text-blue-600 underline">{course.educator.name}</span>
                </p>

                <div className="flex items-center justify-center px-3 py-2 rounded-lg w-fit mx-auto">
                    <CgPlayButtonO
                        className="bg-white rounded-full w-10 h-10 cursor-pointer"
                        onClick={() => {
                            setVideo(!video);
                            setTimeout(() => {
                                videoRef.current?.scrollIntoView({ behavior: "smooth" });
                            }, 200);
                        }}
                    />
                    <p className="bg-white px-2 py-1 rounded-md">Watch Preview</p>
                </div>

                <p className="text-xl font-bold mt-4">Course Description</p>
                <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
            </div>
        </div>
    );
};

export default CardDetails;
