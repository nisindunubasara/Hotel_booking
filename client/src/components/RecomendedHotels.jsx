import HotelCard from "./HotelCard.jsx";
import Title from "./Title.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RecomendedHotels = () => { 
   const navigate = useNavigate();

   const {rooms, searchCities} = useAppContext();
   const [recommended, setRecommended ] = useState([]);

   const filterHotels = ()=>{
      const filterHotels = rooms.slice().filter//room array eka  copy karala filter karanawa
      ( room => searchCities.includes(room.hotel.city));//room eke city eka searchCities list eke thiyenawanam
      setRecommended(filterHotels)//recommended list ekata add karanawa
   }

   useEffect(()=>{
      filterHotels()
   },[rooms, searchCities])//room hari searchCities hari change unoth filterHotels function eka run wenawa

   return recommended.length > 0 && (//recommended list eka empty naththam matta render wenawa
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-state-50 py-20">

         <Title title="Recommended Hotels" subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences." />
         <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
            {recommended.slice(0,4).map((room, index) => (<HotelCard room={room} index={index} key={room._id} />))}//firdt hotel 4 pennanawa
         </div>

         <button onClick={() => {navigate('/rooms'); scrollTo(0,0)}}// button eka click karama rooms page ekata yanawa, page eke top ekata yanawa
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer   ">
            View All Destinations
         </button>
         
      </div>
   )
}
export default RecomendedHotels;