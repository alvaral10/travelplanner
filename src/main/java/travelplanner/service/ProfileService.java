package travelplanner.service;

import org.springframework.web.multipart.MultipartFile;
import travelplanner.dto.ProfileDTO;

public interface ProfileService {
    ProfileDTO getProfile(String username);
    ProfileDTO updateProfile(String username, ProfileDTO dto);
    String uploadProfilePicture(String username, MultipartFile image);
}

