package com.travelapp.controller;

import com.travelapp.model.User;
import com.travelapp.service.AuthService;
import com.travelapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> authenticatedUser = authService.authenticate(user.getEmail(), user.getPassword());

        if (authenticatedUser.isPresent()) {
            String token = jwtService.generateToken(authenticatedUser.get());
            return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
        } else {
            return ResponseEntity.status(401).body("{\"error\": \"Invalid credentials\"}");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User newUser = authService.register(user);
        return ResponseEntity.ok(newUser);
    }
}
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsername(token.replace("Bearer ", ""));
        Optional<User> user = authService.findByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(404).body("User not found"));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestHeader("Authorization") String token, @RequestBody User updatedUser) {
        String email = jwtService.extractUsername(token.replace("Bearer ", ""));
        Optional<User> userOptional = authService.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            authService.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
