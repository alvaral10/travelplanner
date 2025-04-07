package com.travelplanner.security;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void whenUnauthenticated_thenAccessIsDenied() throws Exception {
        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isUnauthorized()); // 401 expected
    }

    @Test
    @WithMockUser(username = "testuser")
    void whenAuthenticated_thenAccessIsAllowed() throws Exception {
        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk()); // Will only pass if ProfileController is wired up correctly
    }
}
