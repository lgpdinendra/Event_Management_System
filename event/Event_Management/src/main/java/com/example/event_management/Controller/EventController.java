package com.example.event_management.Controller;

import com.example.event_management.DTO.EventDTO;
import com.example.event_management.Entity.Event;
import com.example.event_management.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/add")
    public Event saveEvent(@RequestBody EventDTO eventDTO) {

        return eventService.addEvent(eventDTO);
    }

    @GetMapping("/get")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    @PutMapping("/update/{eventid}")
    public ResponseEntity<Event> updateEvents(@PathVariable Integer eventid, @RequestBody EventDTO eventDTO) {
        Event updatedEvent = eventService.updateEvents(eventid, eventDTO);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{eventid}")
    public ResponseEntity<Void> deleteEvent(@PathVariable("eventid") Integer eventid) {
        boolean deleted = eventService.deleteEventById(eventid);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
