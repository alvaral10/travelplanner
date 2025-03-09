package travelplanner.controller;

import travelplanner.dto.UserLoginDTO;
import travelplanner.dto.UserRegisterDTO;
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
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}) // ✅ Allow multiple origins
public class AuthController {

    private final AuthService authService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registers a new user.
     * @param userRegisterDTO User registration details.
     * @return ResponseEntity with success or failure message.
     */
    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody @Valid UserRegisterDTO userRegisterDTO) {
        logger.info("Registering new user: {}", userRegisterDTO.getEmail());
        try {
            String response = authService.registerUser(
                    userRegisterDTO.getFirstName(),
                    userRegisterDTO.getLastName(),
                    userRegisterDTO.getEmail(),
                    userRegisterDTO.getPassword()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", response));
        } catch (Exception e) {
            logger.error("Error during registration: ", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Authenticates a user and issues a JWT token.
     * @param userLoginDTO User login details.
     * @return ResponseEntity with JWT token or error message.
     */
    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody @Valid UserLoginDTO userLoginDTO) {
        logger.info("Attempting login for: {}", userLoginDTO.getEmail());
        try {
            String token = authService.loginUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
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
        } catch (Exception e) {
            logger.error("Email verification error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
