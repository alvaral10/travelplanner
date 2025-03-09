package travelplanner.controller;

import travelplanner.model.User;
import travelplanner.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    // Constructor-based injection (best practice)
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registers a new user.
     * @param user User registration details.
     * @return ResponseEntity with success or failure message.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user) {
        try {
            String response = authService.registerUser(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
            return ResponseEntity.ok(Map.of("message", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Authenticates a user and issues a JWT token.
     * @param user User login details.
     * @return ResponseEntity with JWT token or error message.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid User user) {
        try {
            String token = authService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Verifies the user's email address.
     * @param email The email to verify.
     * @return ResponseEntity confirming email verification.
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) {
        try {
            String response = authService.verifyUser(email);
            return ResponseEntity.ok(Map.of("message", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
