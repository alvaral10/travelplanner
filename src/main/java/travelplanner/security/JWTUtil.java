package travelplanner.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")  // Injects the secret key from application.properties
    private String secretKey;

    private Algorithm algorithm;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // Token validity: 1 hour

    /**
     * Initializes the JWT secret key securely.
     */
    @PostConstruct
    public void init() {
        this.algorithm = Algorithm.HMAC256(secretKey);
    }

    /**
     * Generates a JWT token for the given username with role claims.
     *
     * @param email The username to include in the token.
     * @param role     The role of the user.
     * @return A signed JWT token.
     */
    public String generateToken(String email, String role) {
        return JWT.create()
                .withSubject(email)  // ✅ Store email, not username
                .withClaim("role", role)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }

    /**
     * Validates and extracts username from JWT token.
     *
     * @param token The JWT token.
     * @return The username if valid.
     */
    public String validateToken(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();  // ✅ Return email instead of username
    }
}

