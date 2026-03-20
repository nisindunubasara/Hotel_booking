import { useState } from "react";
import { assets } from "../assets/assets";
import { cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const Hero = () => {

  const {navigate, getToken, axios, setSearchCities} = useAppContext ();
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);

    await axios.post('/api/user/store-recent-search',{recentSearchedCity: destination},{headers: {Authorization: `Bearer ${await getToken()}`}})
  
    setSearchCities(prevSearchedCities => {
        const updatedSearchCities = [...prevSearchedCities, destination];
        if (updatedSearchCities.length > 3) {
            updatedSearchCities.shift();
        }
        return updatedSearchCities;
    });

  }

  return (
    <div className='flex flex-col items-center md:items-start justify-center 
      px-4 md:px-16 lg:px-24 xl:px-32 text-white 
      text-center md:text-left 
      bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center 
      min-h-screen'>

      <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>
        The unlimited Hotel Experience
      </p>

      <h1 className='font-playfair 
        text-3xl md:text-5xl md:text-[56px] md:leading-[56px] 
        font-bold md:font-extrabold 
        max-w-full md:max-w-xl mt-4'>
        Discover Your Perfect Getway Destination
      </h1>

      <p className='max-w-full md:max-w-lg mt-2 text-sm md:text-base'>
        Unparalleled luxury and comfort await at the world's most exclusive hotels
        and resorts. Start your journey today.
      </p>

      {/* SEARCH FORM */}
      <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 
        flex flex-col md:flex-row gap-4 
        items-center md:items-start 
        w-full max-w-xl md:max-w-4xl'>

        {/* Destination */}
        <div className='w-full md:w-auto'>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input onChange={e=> setDestination(e.target.value)} value={destination}
            list='destinations'
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full md:w-auto"
            placeholder="Type here"
            required
          />

          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className='w-full md:w-auto'>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>

          <input 
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full md:w-auto"
          />
        </div>

        {/* Check Out */}
        <div className='w-full md:w-auto'>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>

          <input 
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full md:w-auto"
          />
        </div>

        {/* Guests */}
        <div className='flex flex-col items-center md:items-start w-full md:w-auto'>
          <label htmlFor="guests">Guests</label>

          <input 
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full md:max-w-16"
            placeholder="0"
          />
        </div>

        {/* Search Button */}
        <button className='flex items-center justify-center gap-1 rounded-md bg-black 
          py-3 px-6 text-white my-auto cursor-pointer 
          w-full md:w-auto'>
          <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
