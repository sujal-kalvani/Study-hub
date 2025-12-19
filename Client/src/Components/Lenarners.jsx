import React from 'react'
import microsoft from "../assets/microsoft_logo.svg"
import walmart from "../assets/walmart_logo.svg"
import accenture from "../assets/accenture_logo.svg"
import adobe from "../assets/adobe_logo.svg"
import paypal from "../assets/paypal_logo.svg"

const Lenarners = () => {
  const learners = [
    { path: microsoft, alt: "Microsoft" },
    { path: walmart, alt: "Walmart" },
    { path: accenture, alt: "Accenture" },
    { path: adobe, alt: "Adobe" },
    { path: paypal, alt: "Paypal" },
  ]

  return (
    <div className="mt-12 flex flex-col gap-6 items-center">
      <p className="text-gray-500 text-center">Trusted by learners from</p>

      <div className="flex flex-wrap justify-center gap-8 items-center">
        {learners.map((item, index) => (
          <img
            key={index}
            src={item.path}
            alt={item.alt}
            className="h-8 sm:h-10 object-contain"
          />
        ))}
      </div>
    </div>
  )
}

export default Lenarners
