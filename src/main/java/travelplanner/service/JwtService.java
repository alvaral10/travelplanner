package travelplanner.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service  // Marks this class as a Spring-managed component
public class JwtService {

    @Value("${jwt.secret}")  // Injects the secret key from application.properties
    private String secretKey;

    private Algorithm algorithm;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours expiration

    /**
     * Initializes the JWT secret key securely.
     * Encodes the secret key for improved security.
     */
    @PostConstruct
    public void init() {
        this.algorithm = Algorithm.HMAC256(secretKey);
    }

    /**
     * Generates a JWT token for a given user.
     * @param email The user's email to be included in the token.
     * @param role The user's role (e.g., "ROLE_USER", "ROLE_ADMIN").
     * @return A signed JWT token.
     */
    public String generateToken(String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);  // Include user role in token payload

        return JWT.create()
                .withSubject(email) // Set subject (usually the email)
                .withIssuedAt(new Date()) // Set token creation time
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Set expiration
                .withPayload(claims) // Add claims (role)
                .sign(algorithm); // Sign with secure algorithm
    }

    /**
     * Validates the JWT token and extracts the email if valid.
     * @param token The JWT token to validate.
     * @return The email if the token is valid, otherwise throws an exception.
     * @throws JWTVerificationException if the token is invalid or expired.
     */
    public String validateToken(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject(); // Return email stored in the token
    }

    /**
     * Extracts the user role from the JWT token.
     * @param token The JWT token.
     * @return The user's role.
     */
    public String getUserRoleFromToken(String token) {
        return JWT.decode(token).getClaim("role").asString();
    }

    /**
     * Extracts the expiration time from a given JWT token.
     * @param token The JWT token.
     * @return The expiration date of the token.
     */
    public Date getTokenExpiration(String token) {
        return JWT.decode(token).getExpiresAt();
    }

    /**
     * Checks if a token is expired.
     * @param token The JWT token.
     * @return true if the token is expired, false otherwise.
     */
    public boolean isTokenExpired(String token) {
        return getTokenExpiration(token).before(new Date());
    }
}
