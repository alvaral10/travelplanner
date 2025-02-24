package com.travelapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelapp.model.Itinerary;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
}