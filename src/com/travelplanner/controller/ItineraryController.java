package com.travelplanner.controller;

import com.travelplanner.model.Itinerary;
import com.travelplanner.model.User;
import com.travelplanner.service.ItineraryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    /**
     * Retrieves all itineraries.
     * @return List of all itineraries.
     */
    @GetMapping
    public ResponseEntity<List<Itinerary>> getAllItineraries() {
        return ResponseEntity.ok(itineraryService.getAllItineraries());
    }

    /**
     * Retrieves all itineraries for the authenticated user.
     * @param user The authenticated user.
     * @return List of itineraries belonging to the user.
     */
    @GetMapping("/my")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<Itinerary>> getUserItineraries(@AuthenticationPrincipal User user) {
        List<Itinerary> userItineraries = itineraryService.getUserItineraries(user.getId());
        return ResponseEntity.ok(userItineraries);
    }

    /**
     * Creates a new itinerary for the authenticated user.
     * @param user The authenticated user.
     * @param itinerary The itinerary details.
     * @return The created itinerary.
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> createItinerary(@AuthenticationPrincipal User user, @RequestBody @Valid Itinerary itinerary) {
        Itinerary createdItinerary = itineraryService.createItinerary(itinerary, user);
        return ResponseEntity.ok(Map.of("message", "Itinerary created successfully!", "itinerary", createdItinerary));
    }

    /**
     * Retrieves an itinerary by ID.
     * @param id The itinerary ID.
     * @return The itinerary if found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getItineraryById(@PathVariable Long id) {
        try {
            Itinerary itinerary = itineraryService.getItineraryById(id);
            return ResponseEntity.ok(itinerary);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Updates an itinerary for the authenticated user.
     * @param id The ID of the itinerary to update.
     * @param itineraryDetails The new itinerary details.
     * @param user The authenticated user.
     * @return The updated itinerary.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> updateItinerary(@PathVariable Long id, @RequestBody @Valid Itinerary itineraryDetails, @AuthenticationPrincipal User user) {
        try {
            Itinerary updatedItinerary = itineraryService.updateItinerary(id, itineraryDetails, user);
            return ResponseEntity.ok(Map.of("message", "Itinerary updated successfully!", "itinerary", updatedItinerary));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Deletes an itinerary for the authenticated user.
     * @param id The ID of the itinerary to delete.
     * @param user The authenticated user.
     * @return A success message if deletion is successful.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> deleteItinerary(@PathVariable Long id, @AuthenticationPrincipal User user) {
        try {
            itineraryService.deleteItinerary(id, user);
            return ResponseEntity.ok(Map.of("message", "Itinerary deleted successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
