import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProfileScreen = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // ✅ Clear token on logout
        alert('Logged out successfully');
        navigate('/auth'); // ✅ Redirect to authentication page
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" gutterBottom>User Profile</Typography>

            {/* ✅ Button to navigate to the Itinerary page */}
            <Button variant="contained" color="primary" onClick={() => navigate('/itinerary')} sx={{ mt: 2 }}>
                Go to Itinerary
            </Button>

            {/* ✅ Logout button */}
            <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
                Logout
            </Button>
        </Box>
    );
};

export default ProfileScreen;
