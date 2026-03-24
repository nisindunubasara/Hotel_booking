import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
   return (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
         <Title title="What Our Guests Say" subTitle="Discover why discerning travelers choose our luxury hotels and resorts for their unforgettable stays." />
         <div className="grid md:grid-cols-3 gap-6 w-full py-12">
            {testimonials.map((item) => (
                <div 
                    key={item.id}
                    className="w-full max-w-88 space-y-4 rounded-md border border-gray-200 bg-white p-3 text-gray-500 transition-all duration-300 hover:-translate-y-1"
                >
                    {/* Stars */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            <StarRating />
                        </div>

                        <p>12 Jan 2025</p> 
                        {/* Mama date eka static dala tiyenawa - oyata one nam assets.js eke date ekath add karanna puluwan */}
                    </div>

                    {/* Review */}
                    <p>“{item.review}”</p>

                    {/* User */}
                    <div className="flex items-center gap-2 pt-3">
                        <img 
                            className="h-8 w-8 rounded-full" 
                            src={item.image} 
                            alt={item.name} 
                        />
                        <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.address}</p>
                        </div>
                    </div>
                </div>
            ))}
         </div>
      </div>
   )
}
export default Testimonial;