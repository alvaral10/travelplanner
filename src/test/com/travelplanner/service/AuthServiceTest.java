package com.travelplanner.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import travelplanner.model.Role;
import travelplanner.model.User;
import travelplanner.repository.UserRepository;
import travelplanner.service.AuthService;

import java.util.Optional;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser() {
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("hashedPassword");

        String response = authService.registerUser("Alicia", "Alvarez", "test@example.com", "password");

        assertEquals("User registered successfully! Please verify your email.", response);
    }

    @Test
    void testLoginUser_Failed_InvalidPassword() {
        User user = new User("Alicia", "Alvarez", "test@example.com", "hashedPassword", Role.USER);
        user.setVerified(true);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", user.getPassword())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () ->
                authService.loginUser("test@example.com", "wrongPassword")
        );

        assertEquals("Invalid password", exception.getMessage());
    }
}
