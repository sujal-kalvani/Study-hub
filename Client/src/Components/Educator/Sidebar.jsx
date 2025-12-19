import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarItems = () => {
  const [selected, setSelected] = useState(null);

  const items = [
    {
      name: "Dashboard",
      path: "Dashboard",
    },
    {
      name: "Add Course",
      path: "Add-course",
    },
    {
      name: "My Course",
      path: "My-courses",
    },
    {
      name: "Student Enrolled",
      path: "StudentEnrolled",
    },
]

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <div key={index}>
          <Link
            to={item.path}
            onClick={() => setSelected(index)}
            className={`block px-6 py-1 text-base hover:bg-blue-600 hover:text-white transition ease-in-out duration-200 rounded-lg ${
              selected === index ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SidebarItems;

