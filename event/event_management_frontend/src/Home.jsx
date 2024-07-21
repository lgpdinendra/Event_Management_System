import React from 'react'
import Home_Image from './Images/home-Image.jpg'
import './Home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {

const navigate = useNavigate();

  return (
    <div className='home'>
        <img src={Home_Image} className='home-image'/>

        <div className='home-head'>
            <div className='home-head-text'>
                Event Management System
            </div>
        

        <div className='home-head-btn'>

          <button 
                className='home-btn'
                onClick={() => navigate(`/addEvent`)}
            >
                Create Event
            </button>


          <button 
                className='home-btn-view'
                onClick={() => navigate(`/viewEvent`)}
            >
                View Event
            </button>

            <br/>

            <button
                className='home-btn' 
                onClick={() => navigate(`/EventListAttendee`)}
            >
                Add Attendee
            </button>
        </div>

        </div>
    </div>
  )
}

export default Home