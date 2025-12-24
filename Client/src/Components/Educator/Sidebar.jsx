import React, { useState } from "react";
import { Link } from "react-router-dom";
import home_icon from "../../assets/home_icon.svg"
import add_icon from "../../assets/add_icon.svg"
import Mycourses from "../../assets/Group 4812.svg"
import StudnetEnrolled from "../../assets/person_tick_icon.svg"

const SidebarItems = () => {
  const [selected, setSelected] = useState(null);

  const items = [
    {
      img: home_icon,
      name: "Dashboard",
      path: "Dashboard",
    },
    {
      img: add_icon,
      name: "Add Course",
      path: "Add-course",
    },
    {
      img: Mycourses,
      name: "My Course",
      path: "My-courses",
    },
    {
      img: StudnetEnrolled,
      name: "Student Enrolled",
      path: "StudentEnrolled",
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          onClick={() => setSelected(index)}
          className={`
        flex items-center gap-3 px-4 py-2 rounded-lg
        text-base font-medium transition-all duration-200
        ${selected === index
              ? "border border-blue-700 text-blue-600 shadow-md bg-blue-100"
              : "text-gray-700 hover:border border-blue-700 hover:text-blue-600 hover:bg-blue-100"
            }
      `}
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-5 h-5 object-contain"
          />

          <span>{item.name}</span>
        </Link>
      ))}
    </div>

  );
};

export default SidebarItems;

