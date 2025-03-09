import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" fontWeight="bold" gutterBottom>Welcome to Travel App</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>Plan your trips effortlessly</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/itinerary')} sx={{ mt: 3 }}>
                Go to Itinerary
            </Button>
        </Box>
    );
};

export default HomeScreen;
