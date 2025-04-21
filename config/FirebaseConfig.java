package travelplanner.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.logging.Logger;

@Configuration
public class FirebaseConfig {

    private static final Logger LOGGER = Logger.getLogger(FirebaseConfig.class.getName());

    @PostConstruct
    public void initFirebase() {
        try {
            // Load the service account JSON file from the classpath
            ClassPathResource resource = new ClassPathResource("firebase/serviceAccountKey.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                LOGGER.info("✅ Firebase initialized successfully.");
            } else {
                LOGGER.warning("⚠️ Firebase already initialized.");
            }

        } catch (IOException e) {
            LOGGER.severe("❌ Failed to initialize Firebase: " + e.getMessage());
            throw new RuntimeException("Firebase initialization failed", e);
        }
    }
}
