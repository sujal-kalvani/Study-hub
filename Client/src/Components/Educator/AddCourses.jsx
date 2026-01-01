import React, { useEffect, useState, } from "react";
import SummaryApi from "../../apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const AddCourses = () => {

  const [chapterPage, setChapterPage] = useState(false)
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

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
        console.log(courses);


      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, [token]);

  // Disable scroll when modal opens
  if (chapterPage)
    document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    previewUrl: "",
    description: "",
    price: "",
    thumbnail: null
  });

  const [errors, setErrors] = useState({});

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value
    });

    setErrors({ ...errors, [name]: "" });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({ ...formData, thumbnail: file });
    setErrors({ ...errors, thumbnail: "" });
  };

  // Validate form
  const validate = () => {
    let newErrors = {};

    if (!formData.title) newErrors.title = "Course title is required";
    if (!formData.heading) newErrors.heading = "Course heading is required";
    if (!formData.previewUrl) newErrors.previewUrl = "Course PreviewUrl is required"
    if (!formData.description)
      newErrors.description = "Course description is required";

    if (!formData.price) {
      newErrors.price = "Course price is required";
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Enter a valid price";
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = "Course thumbnail is required";
    } else if (!formData.thumbnail.type.startsWith("image/")) {
      newErrors.thumbnail = "Only image files allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("heading", formData.heading);
      data.append("previewUrl", formData.previewUrl);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("thumbnail", formData.thumbnail);

      const response = await fetch(SummaryApi.AddCourses.url, {
        method: SummaryApi.AddCourses.method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        toast.error(responseData.message || "Course not added");
        return;
      }

      toast.success("Course added successfully!");
      navigate("/educator-dashboard/My-courses")

      // Reset form
      setFormData({
        title: "",
        heading: "",
        previewUrl: "",
        description: "",
        price: "",
        thumbnail: null
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const addChapter = async (e) => {
  e.preventDefault();

  const title = e.target.CT.value.trim();
  const duration = e.target.time.value.trim();
  const youtubeUrl = e.target.CU.value.trim();
  const isPreview = e.target.preview.checked;

  if (!title || !duration || !youtubeUrl) {
    toast.error("All fields are required!");
    return;
  }

  if (!selectedCourseId) {
    toast.error("Please select a course");
    return;
  }

  const urlPattern =
    /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-\._~:/?#[\]@!$&'()*+,;=]*)?$/;

  if (!urlPattern.test(youtubeUrl)) {
    toast.error("Please enter a valid URL!");
    return;
  }

  const chapterData = {
    title,
    duration,
    youtubeUrl,
    isPreview,
    courseId: selectedCourseId,
  };

  const response = await fetch(SummaryApi.AddChapters.url, {
    method: SummaryApi.AddChapters.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chapterData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    toast.error(responseData.message || "Chapter not added");
    return;
  }

  toast.success("Chapter added successfully!");
  setChapterPage(false);
};

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            className="h-10 border lg:w-1/2 pl-3 rounded"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <label>Course Heading</label>
          <input
            type="text"
            name="heading"
            className="h-10 border lg:w-1/2 pl-3 rounded"
            value={formData.heading}
            onChange={handleChange}
          />
          {errors.heading && (
            <p className="text-red-500 text-sm">{errors.heading}</p>
          )}
        </div>

        {/* preview Url */}
        <div className="flex flex-col gap-1">
          <label>Course Preview Url</label>
          <input
            type="text"
            name="previewUrl"
            className="h-10 border lg:w-1/2 pl-3 rounded"
            value={formData.previewUrl}
            onChange={handleChange}
          />
          {errors.previewUrl && (
            <p className="text-red-500 text-sm">{errors.previewUrl}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label>Course Description</label>
          <textarea
            name="description"
            className="border h-20 lg:w-1/2 pl-3 pt-2 rounded"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="flex lg:flex-row flex-col gap-6">

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label>Course Price</label>
            <input
              type="number"
              name="price"
              className="h-10 border lg:w-[50%] pl-3 rounded"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-1 mt-6">
            <label className="flex items-center gap-4 cursor-pointer">
              Course Thumbnail
              <input type="file" className="hidden" onChange={handleFileChange} />
              <span className="bg-blue-600 text-white px-3 py-1 rounded">
                Upload
              </span>
            </label>
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail}</p>
            )}
          </div>

        </div>

        <button
          type="submit"
          className="bg-black text-white w-24 h-9 rounded cursor-pointer"
        >
          Add course
        </button>

        <button type="button" onClick={() => setChapterPage(true)} className="bg-blue-600 text-white w-1/2 h-9 rounded cursor-pointer">+Add Chapter</button>

      </form>
      {
        chapterPage && (
          <div className="add-chapter-url">
            <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
            <form onSubmit={addChapter} className="flex min-h-[40vh] rounded w-80 p-4 pl-4 pr-4 flex-col bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-1 z-50">

              <div className="flex justify-between mb-3">
                <p className="font-bold text-xl">Add Chapter</p>
                <IoMdClose className="h-7 w-7 cursor-pointer" onClick={() => setChapterPage(false)} />
              </div>

              <label htmlFor="CT">Chapter Title</label>
              <input type="text" name="CT" id="CT" className="border border-gray-300 rounded pl-3 mb-2" />

              <label htmlFor="time">Chapter Duration</label>
              <input type="text" name="time" id="time" className="border border-gray-300 rounded pl-3 mb-2" />

              <label htmlFor="CU">Chapter URL</label>
              <input type="url" name="CU" id="CU" className="border border-gray-300 rounded pl-3 mb-3" />

              <select
                value={selectedCourseId || ""}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full border border-gray-300 rounded mb-3 h-7" id="courses"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 mb-3">
                <label htmlFor="preview">Is Preview Free?</label>
                <input type="checkbox" name="preview" id="preview" />
              </div>

              <input type="submit" value="ADD" className="w-full bg-blue-600 h-8 text-white cursor-pointer hover:bg-blue-700" />
            </form>
          </div>
        )
      }
    </>
  );
};

export default AddCourses;
