package travelplanner.repository;

import travelplanner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their email address.
     * @param email The email of the user.
     * @return An Optional containing the user if found.
     */
    Optional<User> findByEmail(String email);

    /**
     * Checks if a user with the given email exists.
     * @param email The email to check.
     * @return true if a user exists with the given email, otherwise false.
     */
    boolean existsByEmail(String email);
}
