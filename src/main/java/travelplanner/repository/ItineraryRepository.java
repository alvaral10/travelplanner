package travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelplanner.model.Itinerary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    /**
     * Retrieves all itineraries belonging to a specific user.
     * @param userId The ID of the user.
     * @return List of itineraries for the user.
     */
    List<Itinerary> findByUserId(Long userId);

    /**
     * Retrieves all itineraries by destination (optional filter).
     * @param destination The destination name.
     * @return List of itineraries matching the destination.
     */
    List<Itinerary> findByDestinationContainingIgnoreCase(String destination);
}
