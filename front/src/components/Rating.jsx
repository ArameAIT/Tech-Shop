import React, { useState } from 'react';

const Rating = ({ rating, onRatingChange, info }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (star) => {
        setHoverRating(star);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (star) => {
        onRatingChange(star);
    };

    return (
        <div className='flex justify-center items-center'>
            {[1, 2, 3, 4, 5].map((star) => (

                <span
                    key={star}
                    className={`cursor-pointer text-2xl ${star <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    &#9733;
                </span>


            ))}
            <span className='mt-[3px]'>
                {info == null ? (
                    <div>(0)</div>
                ) : (
                    <div>({info})</div>
                )}
            </span>
        </div>
    );
};

export default Rating;
