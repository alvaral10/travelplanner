package travelplanner.service;

import travelplanner.model.Itinerary;
import travelplanner.model.User;
import travelplanner.repository.ItineraryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;
    private static final Logger logger = LoggerFactory.getLogger(ItineraryService.class);

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
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized: User not authenticated");
        }

        logger.info("Creating itinerary for user: {}", user.getEmail());

        itinerary.setUser(user);
        itinerary.setCreatedAt(LocalDateTime.now());
        itinerary.setUpdatedAt(LocalDateTime.now());

        Itinerary savedItinerary = itineraryRepository.save(itinerary);
        logger.info("Itinerary created successfully: {}", savedItinerary.getId());

        return savedItinerary;
    }

    /**
     * Retrieves an itinerary by ID, ensuring the user owns it.
     * @param id The itinerary ID.
     * @param user The authenticated user.
     * @return The itinerary if found.
     */
    public Itinerary getItineraryById(Long id, User user) {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Itinerary not found!"));

        // Ensure user owns the itinerary
        if (!itinerary.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to access this itinerary.");
        }

        return itinerary;
    }

    /**
     * Updates an existing itinerary (only if the user is the owner).
     * @param id The ID of the itinerary to update.
     * @param itineraryDetails The new itinerary details.
     * @param user The authenticated user.
     * @return The updated itinerary.
     */
    public Itinerary updateItinerary(Long id, Itinerary itineraryDetails, User user) {
        Itinerary existingItinerary = getItineraryById(id, user);

        logger.info("Updating itinerary {} for user {}", id, user.getEmail());

        // Update fields if they are provided
        if (itineraryDetails.getTitle() != null) existingItinerary.setTitle(itineraryDetails.getTitle());
        if (itineraryDetails.getDestination() != null) existingItinerary.setDestination(itineraryDetails.getDestination());
        if (itineraryDetails.getStartDate() != null) existingItinerary.setStartDate(itineraryDetails.getStartDate());
        if (itineraryDetails.getEndDate() != null) existingItinerary.setEndDate(itineraryDetails.getEndDate());
        if (itineraryDetails.getDetails() != null) existingItinerary.setDetails(itineraryDetails.getDetails());

        existingItinerary.setUpdatedAt(LocalDateTime.now());

        Itinerary updatedItinerary = itineraryRepository.save(existingItinerary);
        logger.info("Itinerary updated successfully: {}", updatedItinerary.getId());

        return updatedItinerary;
    }

    /**
     * Deletes an itinerary (only if the user is the owner).
     * @param id The ID of the itinerary to delete.
     * @param user The authenticated user.
     */
    public void deleteItinerary(Long id, User user) {
        Itinerary existingItinerary = getItineraryById(id, user);

        logger.info("Deleting itinerary {} for user {}", id, user.getEmail());

        itineraryRepository.delete(existingItinerary);
        logger.info("Itinerary deleted successfully: {}", id);
    }
}
