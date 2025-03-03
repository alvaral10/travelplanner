package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.travelapp.model.Itinerary;
import com.travelapp.service.ItineraryService;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {
    @Autowired
    private ItineraryService itineraryService;

    @GetMapping
    public List<Itinerary> getAllItineraries() {
        return itineraryService.getAllItineraries();
    }

    @PostMapping
    public Itinerary createItinerary(@RequestBody Itinerary itinerary) {
        return itineraryService.createItinerary(itinerary);
    }

    @GetMapping("/{id}")
    public Itinerary getItineraryById(@PathVariable Long id) {
        return itineraryService.getItineraryById(id);
    }

    @PutMapping("/{id}")
    public Itinerary updateItinerary(@PathVariable Long id, @RequestBody Itinerary itineraryDetails) {
        return itineraryService.updateItinerary(id, itineraryDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteItinerary(@PathVariable Long id) {
        itineraryService.deleteItinerary(id);
    }
}