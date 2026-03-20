import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

   const currency = import.meta.env.VITE_CURRENCY || "USD";
   const navigate = useNavigate();
   const { user } = useUser();
   const { getToken } = useAuth();
   

   const [isOwner, setIsOwner] = useState(false);
   const [showHotelReg, setShowHotelReg] = useState(false);
   const [searchCities, setSearchCities] = useState([]);
   const [rooms, setRooms] = useState([]);

   const fetchRooms = async () => {
      try {
         const { data } = await axios.get("/api/rooms");
         if (data.success) {
            setRooms(data.rooms);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error(error.message);
      }
   }

   const fetchUser = async () => {
      try {
         const token = await getToken();
         console.log("Fetching user data with token:", token);
         const { data } = await axios.get("/api/user",{headers: { Authorization: `Bearer ${token}` }});
         if (data.success){
            setIsOwner(data.role === "hotelOwner");
            setSearchCities(data.recentSearchedCities)
         }else{
            setTimeout(() => {
               fetchUser()
            },5000)
         }
      } catch (error) {
         toast.error(error.message)
      }
   }

   useEffect(() => {
      if (user) {
         fetchUser();
      }
   }, [user])

   useEffect(() => {
         fetchRooms();
   }, [])


   const value = {
      currency,
      navigate,
      user,
      fetchUser,
      getToken,
      isOwner,
      setIsOwner,
      axios,
      showHotelReg,
      setShowHotelReg,
      searchCities,
      setSearchCities,
      rooms,
      setRooms,
      fetchRooms,
      toast,
   }

   return (
      <AppContext.Provider value={value}>
         {children}
      </AppContext.Provider>
   );
}

export const useAppContext = () => {
   const context = useContext(AppContext);
   if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
   }
   return context;
};