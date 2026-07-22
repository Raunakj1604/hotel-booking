import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import AllRooms from './pages/AllRooms.jsx'
import RoomDetail from './pages/RoomDetail.jsx'
import MyBookings from './pages/MyBookings.jsx'
import HotelReg from './components/HotelReg.jsx'
import Layout from './pages/hotelOwner/Layout.jsx'
import Dashboard from './pages/hotelOwner/Dashboard.jsx'
import AddRoom from './pages/hotelOwner/AddRoom.jsx'
import ListRoom from './pages/hotelOwner/ListRoom.jsx'
import { useAuth } from '@clerk/react';
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/AppContext.jsx'
function App() {
  const isOwnerPath = useLocation().pathname.includes('/owner');

  const {showHotelReg} = useAppContext();


  const { getToken } = useAuth();

  async function printToken() {
    const token = await getToken();
    console.log(token);
  }

  return (
    <>


      <button
        onClick={printToken}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 99999,
        }}
      >
        Get Token
      </button>


      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}

      <div className='min-h-[70vh]'>
        {/* <button onClick={printToken}>Get Token</button>; */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetail />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/owner' element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />

          </Route>


        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
