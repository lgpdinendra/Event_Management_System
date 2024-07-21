import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventForm.css'
import Swal from 'sweetalert2';
import IMG1 from '../Images/img1.jpg'

const EventForm = ({ selectedEvent, onSave, onCancel }) => {
    const [eventDetails, setEventDetails] = useState({
        eventname: '',
        description: '',
        date: '',
        location: '',
    });

    useEffect(() => {
        if (selectedEvent) {
            setEventDetails(selectedEvent);
        }
    }, [selectedEvent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEvent) {
                await axios.put(`http://localhost:8085/api/v1/event/update/${selectedEvent.eventid}`, eventDetails);
                Swal.fire({
                    icon: 'success',
                    title: 'Event Update Successful!',
                    text: 'Event updated successfully.',
                });
                setEventDetails({
                    eventname: '',
                    description: '',
                    date: '',
                    location: '',
                });
                onSave();
            } else {
                await axios.post('http://localhost:8085/api/v1/event/add', eventDetails);
                Swal.fire({
                    icon: 'success',
                    title: 'Event Add Successful!',
                    text: 'Event added successfully.',
                });
            }
            setEventDetails({
                eventname: '',
                description: '',
                date: '',
                location: '',
            });
            
        } catch (error) {
            console.error('Error saving event:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error saving the event.',
            });
        }
    };

    return (
        
        <div className='form-container'>
        <img src={IMG1} className='home-image'/>
        <form onSubmit={handleSubmit} className='event-form'>
            <input 
                type="text" 
                name="eventname" 
                className='event-input'
                placeholder="Event Name" 
                value={eventDetails.eventname} 
                onChange={handleChange} 
                required 
            />
            <input
                name="description" 
                className='event-input'
                placeholder="Description" 
                value={eventDetails.description} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="date" 
                name="date" 
                className='event-input'
                value={eventDetails.date} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="text" 
                name="location" 
                className='event-input'
                placeholder="Location" 
                value={eventDetails.location} 
                onChange={handleChange} 
                required 
            />
            <button 
                className='event-submit'
                type="submit"
            >
                {selectedEvent ? 'Update Event' : 'Add Event'}
            </button>
            {selectedEvent && (
                <button 
                    className='event-cancel'
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            )}
        </form>
        
        </div>
        
    );
};

export default EventForm;
