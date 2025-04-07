package travelplanner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import travelplanner.dto.ProfileDTO;
import travelplanner.service.ProfileService;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    /**
     * GET current user's profile.
     */
    @GetMapping
    public ProfileDTO getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return profileService.getProfile(username);
    }

    /**
     * PUT to update profile information (About Me, Interests).
     */
    @PutMapping
    public ProfileDTO updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestBody ProfileDTO profileDTO) {
        String username = userDetails.getUsername();
        return profileService.updateProfile(username, profileDTO);
    }

    /**
     * POST to upload a new profile picture.
     */
    @PostMapping("/upload-picture")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> uploadProfilePicture(@AuthenticationPrincipal UserDetails userDetails,
                                                    @RequestParam("image") MultipartFile image) {
        String username = userDetails.getUsername();
        String url = profileService.uploadProfilePicture(username, image);
        return Map.of("profilePictureUrl", url);
    }
}

