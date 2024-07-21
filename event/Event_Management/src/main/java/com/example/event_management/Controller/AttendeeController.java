package com.example.event_management.Controller;

import com.example.event_management.DTO.AttendeeDTO;
import com.example.event_management.DTO.LoginDTO;
import com.example.event_management.Entity.Attendee;
import com.example.event_management.Response.LoginMessage;
import com.example.event_management.Service.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/attendee")
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;

    @PostMapping("/add")
    public Attendee saveAttendee(@RequestBody AttendeeDTO attendeeDTO) {
        return attendeeService.addAttendee(attendeeDTO);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginAttendee(@RequestBody LoginDTO loginDTO)
    {
        LoginMessage loginMessage = attendeeService.loginAttendee(loginDTO);
        return ResponseEntity.ok(loginMessage);
    }

    @GetMapping("/recent")
    public List<Attendee> getRecentAttendee() {
        return attendeeService.getRecentlyAttendee();
    }
}
