import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({rating = 4}) => {
   return (
      <>
         {Array(5).fill('').map((_, index) => (//length 5 array ekak hadala eka "" fill karala map karanawa
            <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className="h-4.5 w-4.5" />//index=0,1,2,3,4
             ))}
      </>
   )
}
export default StarRating;