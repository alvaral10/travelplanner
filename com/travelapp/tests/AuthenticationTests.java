package com.travelapp.tests;

import com.travelapp.model.User;
import com.travelapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class AuthenticationTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() {
        User mockUser = new User();
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("hashedpassword"); // Assume already hashed

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

        boolean isAuthenticated = authenticationService.authenticate("test@example.com", "hashedpassword");
        assertTrue(isAuthenticated, "User should be authenticated successfully");
    }

    @Test
    void testLoginFailure() {
        when(userRepository.findByEmail("wrong@example.com")).thenReturn(Optional.empty());

        boolean isAuthenticated = authenticationService.authenticate("wrong@example.com", "wrongpassword");
        assertFalse(isAuthenticated, "Authentication should fail for incorrect credentials");
    }
}