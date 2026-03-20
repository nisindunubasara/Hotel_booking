import HotelCard from "./HotelCard.jsx";
import Title from "./Title.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const FeaturedDestination = () => { 
   
   const {rooms, navigate} = useAppContext();

   return rooms.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-state-50 py-20">

         <Title title="Featured Destinations" subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences." />
         <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
            {rooms.slice(0,4).map((room, index) => (<HotelCard room={room} index={index} key={room._id} />))}
         </div>

         <button onClick={() => {navigate('/rooms'); scrollTo(0,0)}} className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer   ">
            View All Destinations
         </button>
         
      </div>
   )
}
export default FeaturedDestination;