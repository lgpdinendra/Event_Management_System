import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css';
import Swal from 'sweetalert2';
import EventForm from './EventForm';
import IMG2 from '../Images/img2.jpg'

const TABLE_HEADS = [
    "Event Name",
    "Description",
    "Date",
    "Location",
    "Action",
];

const EventList = () => {
    const [eventDetails, setEventDetails] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    const handleDelete = async (eventid) => {
        Swal.fire({
            title: 'Delete Event',
            text: "Do you want to delete this Event?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8085/api/v1/event/${eventid}`);
                    setEventDetails(eventDetails.filter(event => event.eventid !== eventid));
                    Swal.fire(
                        'Deleted!',
                        'The Event has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error deleting event:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the event.',
                        'error'
                    );
                }
            }
        });
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
    };

    const handleSave = () => {
        setSelectedEvent(null);
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
    };

    const handleCancel = () => {
        setSelectedEvent(null);
    };

    return (
        
            <div className="data-table-diagram">
                <img src={IMG2} className='home-image'/>
                
                {selectedEvent && (
                    <EventForm selectedEvent={selectedEvent} onSave={handleSave} onCancel={handleCancel} />
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
                                        className='eventtable-button-edit'
                                        onClick={() => handleEdit(event)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className='eventtable-button-delete'
                                        onClick={() => handleDelete(event.eventid)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
    );
};

export default EventList;
