package travelplanner.service;

import travelplanner.model.Role;
import travelplanner.model.User;
import travelplanner.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Registers a new user with encrypted password and assigns a default role.
     */
    public String registerUser(String firstName, String lastName, String email, String rawPassword) {
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists with email: " + email);
        }

        String encodedPassword = passwordEncoder.encode(rawPassword);

        User newUser = new User(firstName, lastName, email, encodedPassword, Role.USER);
        newUser.setVerified(false);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        userRepository.save(newUser);

        return "User registered successfully! Please verify your email.";
    }

    /**
     * Authenticates a user and generates a JWT token if successful.
     */
    public String loginUser(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email: " + email);
        }

        User user = userOptional.get();

        if (!user.isVerified()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email is not verified. Please verify your account.");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, rawPassword));
        } catch (DisabledException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account is disabled. Contact support.");
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
        }

        // ✅ Ensure `updatedAt` updates before saving
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return jwtService.generateToken(user.getEmail(), user.getRole().name());
    }

    /**
     * Verifies the user's email by updating `isVerified` field.
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
        user.setUpdatedAt(LocalDateTime.now()); // ✅ Ensure updatedAt is set
        userRepository.save(user);

        return "Email verified successfully! You can now log in.";
    }
}
