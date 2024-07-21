package com.example.event_management.Service;

import com.example.event_management.DTO.AttendeeDTO;
import com.example.event_management.DTO.LoginDTO;
import com.example.event_management.Entity.Attendee;
import com.example.event_management.Response.LoginMessage;

import java.util.List;

public interface AttendeeService {

    Attendee addAttendee(AttendeeDTO attendeeDTO);

    LoginMessage loginAttendee(LoginDTO loginDTO);

    List<Attendee> getRecentlyAttendee();
}
