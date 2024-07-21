package com.example.event_management.Service.Implementation;

import com.example.event_management.DTO.EventDTO;
import com.example.event_management.Entity.Event;
import com.example.event_management.Repositary.EventRepo;
import com.example.event_management.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventImpl implements EventService {

    private final EventRepo eventRepo;

    public EventImpl(EventRepo eventRepo) {
        this.eventRepo = eventRepo;
    }

    public Event addEvent(EventDTO eventDTO) {

        Event event = new Event(
                eventDTO.getEventid(),
                eventDTO.getEventname(),
                eventDTO.getDescription(),
                eventDTO.getDate(),
                eventDTO.getLocation()
        );
        return eventRepo.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @Override
    public Event updateEvents(Integer eventid, EventDTO eventDTO) {
        Optional<Event> eventOptional = eventRepo.findById(eventid);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            event.setEventname(eventDTO.getEventname());
            event.setDescription(eventDTO.getDescription());
            event.setDate(eventDTO.getDate());
            event.setLocation(eventDTO.getLocation());
            return eventRepo.save(event);
        }
        return null;
    }


    @Override
    public boolean deleteEventById(Integer eventid) {
        Optional<Event> eventOptional = eventRepo.findById(eventid);

        if (eventOptional.isEmpty()) {
            return false;
        }
        Event event = eventOptional.get();
        eventRepo.deleteById(eventid);

        return true;
    }
}
