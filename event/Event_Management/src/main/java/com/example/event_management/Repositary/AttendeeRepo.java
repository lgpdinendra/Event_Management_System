package com.example.event_management.Repositary;

import com.example.event_management.Entity.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttendeeRepo extends JpaRepository<Attendee, Integer> {
    Attendee findByEmail(String email);

    Optional<Attendee> findOneByEmailAndPassword(String email, String password);

    //List<Attendee> findAllAttendee(String email);

    //List<Attendee> findAllAttendee();
}
