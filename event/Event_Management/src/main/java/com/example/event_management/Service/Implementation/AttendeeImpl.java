package com.example.event_management.Service.Implementation;

import com.example.event_management.DTO.AttendeeDTO;
import com.example.event_management.DTO.LoginDTO;
import com.example.event_management.Entity.Attendee;
import com.example.event_management.Entity.Event;
import com.example.event_management.Repositary.AttendeeRepo;
import com.example.event_management.Repositary.EventRepo;
import com.example.event_management.Response.LoginMessage;
import com.example.event_management.Service.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendeeImpl implements AttendeeService {

    @Autowired
    private AttendeeRepo attendeeRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EventRepo eventRepo;

    public Attendee addAttendee(AttendeeDTO attendeeDTO) {
        Optional<Event> eventOptional = eventRepo.findById(attendeeDTO.getEventid());
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
        Attendee attendee = new Attendee(
                attendeeDTO.getAttendeeId(),
                attendeeDTO.getName(),
                attendeeDTO.getEmail(),
                this.passwordEncoder.encode(attendeeDTO.getPassword()),
                event

        );
        return attendeeRepo.save(attendee);
        }
        return null;
    }

    @Override
    public LoginMessage loginAttendee(LoginDTO loginDTO) {

        Attendee attendee = attendeeRepo.findByEmail(loginDTO.getEmail());
        if (attendee != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = attendee.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<Attendee> attendee1 = attendeeRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (attendee1.isPresent()) {
                    return new LoginMessage("Login Success", true);
                } else {
                    return new LoginMessage("Login Failed", false);
                }
            } else {
                return new LoginMessage("password Not Match", false);
            }
        }else {
            return new LoginMessage("Email not exits ", false);
        }
    }

    @Override
    public List<Attendee> getRecentlyAttendee() {
        return attendeeRepo.findAll();
    }

}
