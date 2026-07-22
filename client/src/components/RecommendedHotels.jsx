import React from 'react'
import { useAppContext } from '../context/AppContext'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const RecommendedHotels = () => {
  const navigate = useNavigate()
  const {rooms,searchedCities} = useAppContext();
  const [recommended, setRecommended] = useState([]);
  const filterHotels = () => {
    console.log(searchedCities);
    console.log(rooms);
    const filteredHotels = rooms.slice().filter((room) => searchedCities.includes(room.hotel.city));
    
    setRecommended(filteredHotels);
  }
  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);
  return recommended.length > 0 && (
    <div className='flex flex-col  items-center px-5 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title title={"Recommended Hotels"} subTitle={"Discover our handpicked selection of exceptional properties"}/>
        <div className ='flex flex-wrap justify-center items-center gap-6 mt-20'>
        {recommended.slice(0,4).map((room,index)=>(
          <HotelCard key={room._id} room={room} index={index}/>
        ))}
      </div>

    </div>
  )
}

export default RecommendedHotels