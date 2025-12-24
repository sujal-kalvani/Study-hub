import React, { useState } from "react";
import SummaryApi from "../../apis";
import { toast } from "react-toastify";

const AddCourses = () => {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
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

      if (!response.ok) {
        toast.error(responseData.message || "Course not added");
        return;
      }

      toast.success("Course added successfully!");

      // Reset form
      setFormData({
        title: "",
        heading: "",
        description: "",
        price: "",
        thumbnail: null
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
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
        className="bg-black text-white w-24 h-9 rounded"
      >
        Add
      </button>

    </form>
  );
};

export default AddCourses;
