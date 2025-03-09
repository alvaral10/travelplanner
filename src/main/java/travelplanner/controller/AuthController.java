package travelplanner.controller;

import travelplanner.model.User;
import travelplanner.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registers a new user.
     * @param user User registration details.
     * @return ResponseEntity with success or failure message.
     */
    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody @Valid User user) {
        logger.info("Registering new user: {}", user.getEmail());
        try {
            String response = authService.registerUser(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", response));
        } catch (RuntimeException e) {
            logger.error("Error during registration: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Authenticates a user and issues a JWT token.
     * @param user User login details.
     * @return ResponseEntity with JWT token or error message.
     */
    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody @Valid User user) {
        logger.info("Attempting login for: {}", user.getEmail());
        try {
            String token = authService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            logger.warn("Failed login attempt: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Verifies the user's email address.
     * @param email The email to verify.
     * @return ResponseEntity confirming email verification.
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) {
        logger.info("Verifying email: {}", email);
        try {
            String response = authService.verifyUser(email);
            return ResponseEntity.ok(Map.of("message", response));
        } catch (RuntimeException e) {
            logger.error("Email verification error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
