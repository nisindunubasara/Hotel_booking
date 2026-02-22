import React from "react";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import AllRooms from "./Pages/AllRooms";
import RoomDetails from "./Pages/RoomDetails";
import MyBookings from "./Pages/MyBookings";
import HotelCard from "./components/HotelCard";
import HotelReg from "./components/HotelReg"; 
import LayOut from "./Pages/HotelOwner/LayOut";
import DashBoard from "./Pages/HotelOwner/DashBoard";
import AddRoom from "./Pages/HotelOwner/AddRoom";
import ListRoom from "./Pages/HotelOwner/ListRoom";

const App = () => {

  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");

  return (
    <div className="min-h-screen flex flex-col">
      {false && <HotelReg />}
      {!isOwnerPath && <NavBar />}
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='rooms' element={<AllRooms />} />
          <Route path='rooms/:id' element={<RoomDetails />} />
          <Route path='my-bookings' element={<MyBookings />} />
          <Route path='/owner' element={<LayOut />}>
              <Route index element={<DashBoard />} />
              <Route path='add-room' element={<AddRoom />} />
              <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  )
}
export default App;