import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import React from "react";

const Rating = ({ value, text }) => {
  return (
    <div className="flex flex-row space-x-1 items-center justify-start">
      <span>
        {value >= 1 ? (
          <FaStar className="text-[#f1c40f]" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="text-[#f1c40f]" />
        ) : (
          <FaRegStar className="text-[#353b48]" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="text-[#f1c40f]" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="text-[#f1c40f]" />
        ) : (
          <FaRegStar className="text-[#353b48]" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="text-[#f1c40f]" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="text-[#f1c40f]" />
        ) : (
          <FaRegStar className="text-[#353b48]" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="text-[#f1c40f]" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="text-[#f1c40f]" />
        ) : (
          <FaRegStar className="text-[#353b48]" />
        )}
      </span>
      <span>
        {value == 5 ? (
          <FaStar className="text-[#f1c40f]" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="text-[#f1c40f]" />
        ) : (
          <FaRegStar className="text-[#353b48]" />
        )}
      </span>
      <span className="text-gray-600 pl-2 text-sm">{text && text}</span>
    </div>
  );
};

export default Rating;
