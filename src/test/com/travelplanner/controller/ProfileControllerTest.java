package com.travelplanner.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import travelplanner.dto.ProfileDTO;
import travelplanner.service.ProfileService;

import static java.lang.reflect.Array.get;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "testuser") // Use your user auth config
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @Test
    void testUpdateProfile() throws Exception {
        ProfileDTO updatedProfile = new ProfileDTO("Updated bio", "New interests", null);

        Mockito.when(profileService.updateProfile(anyString(), any()))
                .thenReturn(updatedProfile);

        mockMvc.perform(put("/api/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                        "aboutMe": "Updated bio",
                        "interests": "New interests"
                    }
                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aboutMe").value("Updated bio"));
    }

    @Test
    void testUploadProfilePicture() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "image", "profile.jpg", MediaType.IMAGE_JPEG_VALUE, "image-content".getBytes());

        Mockito.when(profileService.uploadProfilePicture(anyString(), any()))
                .thenReturn("http://example.com/uploads/profile.jpg");

        mockMvc.perform(multipart("/api/profile/upload-picture").file(file))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.profilePictureUrl").value("http://example.com/uploads/profile.jpg"));
    }
}

