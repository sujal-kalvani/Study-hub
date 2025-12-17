import React from 'react'
import microsoft from "../assets/microsoft_logo.svg"
import Walmart from "../assets/walmart_logo.svg"
import accenture from "../assets/accenture_logo.svg"
import adobe from "../assets/adobe_logo.svg"
import paypal from "../assets/paypal_logo.svg"

const Lenarners = () => {
    const learners = [
        {
            path:microsoft,
            alt:"Microsoft"
        },

        {
            path:Walmart,
            alt:"Walmart"
        },
        
        {
            path:accenture,
            alt:"accenture"
        },
        
        {
            path:adobe,
            alt:"adobe"
        },
        
        {
            path:paypal,
            alt:"paypal"
        },
    ]
    return (
        <>
            <div className="mt-10 flex flex-col gap-5">
                <p className="text-gray-500 mb-4 text-center">Trusted by learners from</p>

                <div className="flex gap-10 items-center">
                    {learners.map((item, index) => (
                        <div key={index}>
                            <img src={item.path} alt={item.alt}/>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Lenarners
