import React from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';


const HotelReg = () => {

   const {setShowHotelReg, axios, getToken, setIsOwner} = useAppContext();

   const [name, setName] = React.useState("");
   const [contact, setContact] = React.useState("");
   const [address, setAddress] = React.useState("");
   const [city, setCity] = React.useState("");

   const onSubmitHandler = async (event) => {
      console.log("1️⃣ Form submit triggered");

      try {
         event.preventDefault();
         console.log("2️⃣ Sending request to backend");

         const { data } = await axios.post(
            "/api/hotel/register", 
            { name, contact, address, city },
            {headers: { Authorization: `Bearer ${await getToken()}` }}
         );
         
         console.log("4️⃣ Response from backend:", data);

         if (data.success) {
            toast.success(data.message);
            setIsOwner(true);
            setShowHotelReg(false);
         }
      } catch (error) {
         toast.error(error.message)
      }
   }

  return (
    <div  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">


      <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()} className='flex bg-white rounded-xl max-w-2xl max-md:mx-2'>
         <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block'/>

         <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
            <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' onClick={()=> setShowHotelReg(false)} />
            <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

            <div className='w-full mt-4'>
               <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
               <input id="name" onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Type Here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>

            <div className='w-full mt-2'>
               <label htmlFor="contact" className='font-medium text-gray-500'>Phone Number</label>
               <input id='contact' onChange={(e)=> setContact(e.target.value)} value={contact} type="text" placeholder='Type Here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>

            <div className='w-full mt-2'>
               <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
               <input id="address" onChange={(e)=> setAddress(e.target.value)} value={address} type="text" placeholder='Type Here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>

            <div className='w-full mt-2 max-w-80 mr-auto'>
               <label htmlFor="city" className='font-medium text-gray-500'>City</label>
               <select name="city" id="city" onChange={(e)=> setCity(e.target.value)} value={city} className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
                  <option value="">Select City</option>
                  {cities.map((city)=>(
                     <option key={city} value={city}>{city}</option>
                  ))}
               </select>
            </div>
            <button type="submit"
            className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-4 py-1 rounded cursor-pointer mt-4'>Register</button>
         </div>
      </form>
    </div>
  )
}

export default HotelReg