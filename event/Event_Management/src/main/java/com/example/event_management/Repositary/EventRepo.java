package com.example.event_management.Repositary;

import com.example.event_management.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepo extends JpaRepository<Event,Integer> {

    //List<Event> findAllEvents();
}
