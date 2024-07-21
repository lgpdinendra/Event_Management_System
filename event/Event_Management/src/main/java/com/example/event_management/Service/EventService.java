package com.example.event_management.Service;

import com.example.event_management.DTO.EventDTO;
import com.example.event_management.Entity.Event;

import java.util.List;

public interface EventService {

    Event addEvent(EventDTO eventDTO);

    List<Event> getAllEvents();

    Event updateEvents(Integer eventid, EventDTO eventDTO);

    boolean deleteEventById(Integer eventid);
}
