//App ekata ona data + functions okkoma ekama place ekin share karana system ekak,Brain ekak wage

import axios from "axios"; //backend API calls karanna use karanawa
import { createContext, //global store ekak hadanawa
         useState, //Ex;-const [count, setCount] = useState(0); mehema dala count variable eka 0 value eka thiyenawa, setCount function eka use karala count variable eka update karanna puluwan
         useEffect, //automatically run karana ona functions mekata danawa,[] denna eka dependency array eka 
         useContext //context ekata access karanna use karanawa
      } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, // logged in user data access karanna use karanawa
         useAuth // authentication status and token management karanna use karanawa 
      } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;//backend eka set karanawa, api calls karaddi api url eka repeat karanna epa wenawa, api calls karaddi /api/rooms kiyala call karanna puluwan, backend url eka automatic add wenawa(axios)

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
         const { data } = await axios.get("/api/rooms");//API eken backend ekat gihin database eken data aran me variable ekata assign karanawa
         if (data.success) {
            setRooms(data.rooms);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error(error.message);//me kotasa thiyenne network error ekak wage unexpected error ekak handle karanna
      }
   }

   const fetchUser = async () => {
      try {
         const token = await getToken();//user login wela thiyenawanam token eka ganna
         console.log("Fetching user data with token:", token);
         const { data } = await axios.get("/api/user",{headers: { Authorization: `Bearer ${token}` }});// headers dala thiyenne sequrites wadi karanna
         if (data.success){
            setIsOwner(data.role === "hotelOwner");
            setSearchCities(data.recentSearchedCities)
         }else if (retries < 3) {
            retries++;             //backend eken user data ganna failed unoth, 5 second wait karala aye try karanawa
            setTimeout(fetchUser, 5000);
         }
      } catch (error) {
         toast.error(error.message)
         console.log("Error fetching user data:", error);
      }
   }

   useEffect(() => { //user change wela thiyenawanam user data fetch karanawa , palaweni parath fetchUser function eka call karanawa
      if (user) {
         fetchUser();
      }
   }, [user])

   useEffect(() => { //component eka load wela thiyenawanam backend eken rooms data ganna
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

export const useAppContext = () => { //appcontext eke data and functions access karanna use karanawa, ona component ekata import karala usecontext wage use karala access karanna puluwan 
   const context = useContext(AppContext);
   if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
   }
   return context;
};