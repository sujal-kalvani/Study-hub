import React, { useEffect, useState } from "react";
import SummaryApi from "../../apis";

const CourseRating = ({ id, AllRatings,setAllRatings}) => {
  const [reviews, setReviews] = useState([]);

  const getRatings = async () => {
    try {
      const response = await fetch(SummaryApi.getRatings.url, {
        method: SummaryApi.getRatings.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) return;

      setReviews(data.reviews);
    } catch (error) {
      console.error("Rating fetch error:", error);
    }
  };

  useEffect(() => {
    if (id) getRatings();
  }, [id]);

  const onClose=()=>{
    setAllRatings(!AllRatings)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Student Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No reviews yet
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border-b pb-6 last:border-none"
              >
                {/* Avatar */}
                {item.profileImage ? (
                  <img
                    src={`http://localhost:8000${item.profileImage}`}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {item.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Right Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-base text-gray-900">
                      {item.name}
                    </h4>

                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < (item.rating || 4)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 mt-2 leading-relaxed text-lg">
                    {item.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRating;
