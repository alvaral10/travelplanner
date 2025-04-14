package travelplanner.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelplanner.dto.ProfileDTO;

@Service
public class ProfileService {

    public ProfileDTO getProfile(String username) {
        // TODO: Replace this with actual logic
        return new ProfileDTO("This is my bio", "My hobbies", "http://example.com/avatar.jpg");
    }

    public ProfileDTO updateProfile(String username, ProfileDTO dto) {
        // TODO: Replace this with actual logic
        return dto;
    }

    public String uploadProfilePicture(String username, MultipartFile image) {
        // TODO: Replace this with actual file upload logic
        return "http://example.com/newavatar.jpg";
    }
}
