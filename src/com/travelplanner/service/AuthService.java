package com.travelplanner.service;

import com.travelplanner.model.Role;
import com.travelplanner.model.User;
import com.travelplanner.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service  // Marks this class as a Spring-managed service component
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Constructor-based dependency injection (best practice)
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Registers a new user with encrypted password and assigns a default role.
     * @param firstName The user's first name.
     * @param lastName The user's last name.
     * @param email The user's email.
     * @param rawPassword The raw password.
     * @return A success message or JWT token.
     */
    public String registerUser(String firstName, String lastName, String email, String rawPassword) {
        // Check if the email is already registered
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists with email: " + email);
        }

        // Encrypt password before saving to the database
        String encodedPassword = passwordEncoder.encode(rawPassword);

        // Create a new user with ROLE_USER by default, not verified
        User newUser = new User(firstName, lastName, email, encodedPassword, Role.ROLE_USER);
        newUser.setVerified(false);  // Requires email verification
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        userRepository.save(newUser);

        // Optionally generate a JWT token upon registration
        return "User registered successfully! Please verify your email.";
    }

    /**
     * Authenticates a user and generates a JWT token if successful.
     * @param email The user's email.
     * @param rawPassword The raw password input.
     * @return A JWT token if authentication is successful.
     * @throws ResponseStatusException If authentication fails.
     */
    public String loginUser(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email: " + email);
        }

        User user = userOptional.get();

        // Check if the user is verified
        if (!user.isVerified()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email is not verified. Please verify your account.");
        }

        // Validate password using PasswordEncoder
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        // Authenticate user using Spring Security's AuthenticationManager
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, rawPassword));

        // Generate and return JWT token
        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }

    /**
     * Verifies the user's email by updating `isVerified` field.
     * @param email The user's email to verify.
     * @return Success message if verification is successful.
     */
    public String verifyUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email: " + email);
        }

        User user = userOptional.get();
        if (user.isVerified()) {
            return "Email is already verified.";
        }

        user.setVerified(true);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return "Email verified successfully! You can now log in.";
    }
}
