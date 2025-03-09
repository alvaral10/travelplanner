package travelplanner.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;  // User's first name

    @Column(nullable = false)
    private String lastName;  // User's last name

    @Column(nullable = false, unique = true)
    private String email;  // Unique email for authentication

    @Column(nullable = false)
    private String password;  // Encrypted password

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;  // User role: "ROLE_USER", "ROLE_ADMIN", etc.

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;  // Timestamp for account creation

    @Column(nullable = false)
    private LocalDateTime updatedAt;  // Timestamp for last profile update

    @Column(nullable = false)
    private boolean isEnabled = true;  // Account status (default: enabled)

    @Column(nullable = false)
    private boolean isVerified = false;  // Email verification status (default: not verified)

    // Default constructor (required by JPA)
    public User() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Constructor with parameters
    public User(String firstName, String lastName, String email, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }

    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    /**
     * Sets the createdAt timestamp, ensuring it is only set once.
     * @param createdAt The timestamp to set.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        if (this.createdAt == null) {  // Ensure createdAt is only set once
            this.createdAt = createdAt;
        }
    }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public boolean isEnabled() { return isEnabled; }

    public void setEnabled(boolean enabled) { isEnabled = enabled; }

    public boolean isVerified() { return isVerified; }

    public void setVerified(boolean verified) { isVerified = verified; }
}
