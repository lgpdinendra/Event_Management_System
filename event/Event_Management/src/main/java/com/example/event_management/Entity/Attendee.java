package com.example.event_management.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "attendee")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendee_id", length = 45)
    private int attendeeId;

    @Column(name="name", length = 255)
    private String name;

    @Column(name="email", length = 255)
    private String email;

    @JsonIgnore
    @Column(name="password", length = 255)
    private String password;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
}
