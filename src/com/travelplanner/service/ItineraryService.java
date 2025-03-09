package com.travelplanner.service;

import com.travelplanner.model.Itinerary;
import com.travelplanner.model.User;
import com.travelplanner.repository.ItineraryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;

    public ItineraryService(ItineraryRepository itineraryRepository) {
        this.itineraryRepository = itineraryRepository;
    }

    /**
     * Retrieves all itineraries (Admin only).
     * @return List of all itineraries.
     */
    public List<Itinerary> getAllItineraries() {
        return itineraryRepository.findAll();
    }

    /**
     * Retrieves all itineraries belonging to a specific user.
     * @param userId The user's ID.
     * @return List of itineraries for the user.
     */
    public List<Itinerary> getUserItineraries(Long userId) {
        return itineraryRepository.findByUserId(userId);
    }

    /**
     * Creates a new itinerary for the authenticated user.
     * @param itinerary The itinerary details.
     * @param user The authenticated user.
     * @return The created itinerary.
     */
    public Itinerary createItinerary(Itinerary itinerary, User user) {
        itinerary.setUser(user);
        itinerary.setCreatedAt(LocalDateTime.now());
        itinerary.setUpdatedAt(LocalDateTime.now());
        return itineraryRepository.save(itinerary);
    }

    /**
     * Retrieves an itinerary by ID.
     * @param id The itinerary ID.
     * @return The itinerary if found.
     */
    public Itinerary getItineraryById(Long id) {
        return itineraryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary not found!"));
    }

    /**
     * Updates an existing itinerary (only if the user is the owner).
     * @param id The ID of the itinerary to update.
     * @param itineraryDetails The new itinerary details.
     * @param user The authenticated user.
     * @return The updated itinerary.
     */
    public Itinerary updateItinerary(Long id, Itinerary itineraryDetails, User user) {
        Itinerary existingItinerary = getItineraryById(id);

        // Ensure the user owns the itinerary
        if (!existingItinerary.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this itinerary.");
        }

        existingItinerary.setTitle(itineraryDetails.getTitle());
        existingItinerary.setDestination(itineraryDetails.getDestination());
        existingItinerary.setStartDate(itineraryDetails.getStartDate());
        existingItinerary.setEndDate(itineraryDetails.getEndDate());
        existingItinerary.setDetails(itineraryDetails.getDetails());
        existingItinerary.setUpdatedAt(LocalDateTime.now());

        return itineraryRepository.save(existingItinerary);
    }

    /**
     * Deletes an itinerary (only if the user is the owner).
     * @param id The ID of the itinerary to delete.
     * @param user The authenticated user.
     */
    public void deleteItinerary(Long id, User user) {
        Itinerary existingItinerary = getItineraryById(id);

        // Ensure the user owns the itinerary
        if (!existingItinerary.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this itinerary.");
        }

        itineraryRepository.delete(existingItinerary);
    }
}
