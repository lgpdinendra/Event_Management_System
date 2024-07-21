package com.example.event_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventDTO {

    private int eventid;

    private String eventname;

    private String description;

    private LocalDate date;

    private String location;
}
