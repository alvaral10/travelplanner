package com.travelplanner.controller;

import com.travelplanner.model.User;
import com.travelplanner.service.AuthService;
import com.travelplanner.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final AuthService authService;
    private final JwtService jwtService;

    public UserController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    /**
     * Handles user login and returns a JWT token upon successful authentication.
     * @param user The user login credentials.
     * @return ResponseEntity containing the JWT token or an error message.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid User user) {
        String token = authService.loginUser(user.getEmail(), user.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }

    /**
     * Registers a new user with required fields.
     * @param user The user registration details.
     * @return ResponseEntity containing user data or an error message.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid User user) {
        String response = authService.registerUser(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
        return ResponseEntity.ok(Map.of("message", response));
    }

    /**
     * Verifies the user's email address.
     * @param email The email to verify.
     * @return ResponseEntity confirming email verification.
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) {
        String response = authService.verifyUser(email);
        return ResponseEntity.ok(Map.of("message", response));
    }
}
