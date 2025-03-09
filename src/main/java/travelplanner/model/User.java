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
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private boolean isEnabled = true;

    @Column(nullable = false)
    private boolean isVerified = false;

    // ✅ Default constructor (JPA requirement)
    public User() {
        setCreatedAt(LocalDateTime.now());
        setUpdatedAt(LocalDateTime.now());
    }

    // ✅ Constructor with parameters
    public User(String firstName, String lastName, String email, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        setCreatedAt(LocalDateTime.now());
        setUpdatedAt(LocalDateTime.now());
    }

    // ✅ Getters
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public Role getRole() { return role; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public boolean isEnabled() { return isEnabled; }
    public boolean isVerified() { return isVerified; }

    // ✅ Setters with automatic timestamp update
    public void setFirstName(String firstName) {
        this.firstName = firstName;
        setUpdatedAt(LocalDateTime.now());
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        setUpdatedAt(LocalDateTime.now());
    }

    public void setEmail(String email) {
        this.email = email;
        setUpdatedAt(LocalDateTime.now());
    }

    public void setPassword(String password) {
        this.password = password;
        setUpdatedAt(LocalDateTime.now());
    }

    public void setRole(Role role) {
        this.role = role;
        setUpdatedAt(LocalDateTime.now());
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
        setUpdatedAt(LocalDateTime.now());
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
        setUpdatedAt(LocalDateTime.now());
    }

    /**
     * ✅ Sets the createdAt timestamp **only once** when the user is first created.
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        if (this.createdAt == null) {  // Ensure it is set only once
            this.createdAt = createdAt;
        }
    }

    /**
     * ✅ Updates the `updatedAt` field **whenever changes are made**.
     */
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
