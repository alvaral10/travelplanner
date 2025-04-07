package travelplanner.dto;

public class ProfileDTO {
    private String aboutMe;
    private String interests;
    private String profilePictureUrl;

    // Constructors
    public ProfileDTO() {
    }

    public ProfileDTO(String aboutMe, String interests, String profilePictureUrl) {
        this.aboutMe = aboutMe;
        this.interests = interests;
        this.profilePictureUrl = profilePictureUrl;
    }

    // Getters and Setters
    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    // toString() if needed
    @Override
    public String toString() {
        return "ProfileDto{" +
                "aboutMe='" + aboutMe + '\'' +
                ", interests='" + interests + '\'' +
                ", profilePictureUrl='" + profilePictureUrl + '\'' +
                '}';
    }
}
