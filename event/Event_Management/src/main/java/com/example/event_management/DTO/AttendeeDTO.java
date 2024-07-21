package com.example.event_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AttendeeDTO {

    private int attendeeId;

    private String name;

    private String email;

    private String password;

    private int eventid;
}
