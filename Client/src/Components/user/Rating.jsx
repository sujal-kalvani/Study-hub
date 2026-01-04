import React, { useEffect, useState } from 'react'
import SummaryApi from '../../apis'
import { toast } from 'react-toastify'

const Rating = ({ initialRating, onRate ,id}) => {

    const [rating, setRating] = useState(initialRating || 0)

    const token=localStorage.getItem("token")

    // console.log(id);
    

    const handleRating = async(value) => {
        setRating(value)

        if (onRate) onRate(value)

              try {
                const response = await fetch(SummaryApi.submitRatings.url, {
                  method: SummaryApi.submitRatings.method,
                  headers: {
                    Authorization: `Bearer ${token}`,
                     "content-type": "application/json",
                    },
                    body: JSON.stringify({value,id}),
                })
        
                const data = await response.json()
        
                if (!response.ok) {
                  throw new Error(data.message || 'Failed to submit rating')
                }
                
                toast.success("Rated Successfully")
                // setCourses(data.courses)
              } catch (error) {
                toast.error(error.message)
              } finally {
                setLoading(false)
              }
        
    }

    useEffect(() => {
        if (initialRating) setRating(initialRating)
    }, [initialRating])

    return (
        <>
            {
                Array.from({ length: 5 }, (_, index) => {
                    const starValue = index + 1;

                    return (
                        <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`} onClick={() => handleRating(starValue)}>&#9733;</span>
                    )
                })
            }
        </>
    )
}

export default Rating
