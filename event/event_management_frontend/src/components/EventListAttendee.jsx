import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css';
import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';
import './EventListAttendee.css';
import IMG2 from '../Images/img2.jpg';

const TABLE_HEADS = [
    "Event Name",
    "Description",
    "Date",
    "Location",
    "Action",
];

const EventListAttendee = () => {
    const [eventDetails, setEventDetails] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/v1/event/get");
                setEventDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEventDetails();
    }, []);


    const handleAttend = (eventid) => {
        navigate(`/Register/${eventid}`);
    };

    return (
        <>
            <div className="data-table-diagram">
            <img src={IMG2} className='home-image'/>

                {selectedEvent && (
                    <EventForm selectedEvent={selectedEvent} />
                )}
                <table>
                    <thead>
                        <tr>
                            {TABLE_HEADS.map((th, index) => (
                                <th key={index}>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(eventDetails) && eventDetails.map((event) => (
                            <tr key={event.eventid}>
                                <td>{event.eventname}</td>
                                <td>{event.description}</td>
                                <td>{event.date}</td>
                                <td>{event.location}</td>
                                <td className="dt-cell-action">
                                    <button 
                                        className='eventlistAttendeetable-btn'
                                        onClick={() => handleAttend(event.eventid)}
                                    >
                                        Attend
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                className='home-btn-attendee' 
                onClick={() => navigate(`/logging`)}
            >
                Log to View Attendee
            </button>
            </div>
        </>
    );
};

export default EventListAttendee;
