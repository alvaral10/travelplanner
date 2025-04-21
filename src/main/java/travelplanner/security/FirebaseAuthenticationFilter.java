package travelplanner.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = Logger.getLogger(FirebaseAuthenticationFilter.class.getName());
    private final UserDetailsService userDetailsService;

    public FirebaseAuthenticationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        String idToken = resolveToken(request);
        if (idToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
                String uidOrEmail = decoded.getEmail(); // or decoded.getUid()

                // load/create a Spring Security UserDetails based on Firebase user
                UserDetails userDetails = userDetailsService.loadUserByUsername(uidOrEmail);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (FirebaseAuthException e) {
                LOGGER.log(Level.WARNING, "Firebase token verification failed: {0}", e.getMessage());
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: invalid or expired Firebase ID token");
                return;
            }
        }
        chain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}