package com.travelapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "itineraries")
public class Itinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String details;

    // Getters and Setters
}