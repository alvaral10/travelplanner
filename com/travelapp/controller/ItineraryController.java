package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.travelapp.model.Itinerary;
import com.travelapp.repository.ItineraryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {
    @Autowired
    private ItineraryRepository itineraryRepository;

    @GetMapping
    public List<Itinerary> getAllItineraries() {
        return itineraryRepository.findAll();
    }

    @PostMapping
    public Itinerary createItinerary(@RequestBody Itinerary itinerary) {
        return itineraryRepository.save(itinerary);
    }

    @GetMapping("/{id}")
    public Itinerary getItineraryById(@PathVariable Long id) {
        return itineraryRepository.findById(id).orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }

    @PutMapping("/{id}")
    public Itinerary updateItinerary(@PathVariable Long id, @RequestBody Itinerary itineraryDetails) {
        Itinerary itinerary = itineraryRepository.findById(id).orElseThrow(() -> new RuntimeException("Itinerary not found"));
        itinerary.setDestination(itineraryDetails.getDestination());
        itinerary.setStartDate(itineraryDetails.getStartDate());
        itinerary.setEndDate(itineraryDetails.getEndDate());
        itinerary.setDetails(itineraryDetails.getDetails());
        return itineraryRepository.save(itinerary);
    }

    @DeleteMapping("/{id}")
    public void deleteItinerary(@PathVariable Long id) {
        Itinerary itinerary = itineraryRepository.findById(id).orElseThrow(() -> new RuntimeException("Itinerary not found"));
        itineraryRepository.delete(itinerary);
    }
}
