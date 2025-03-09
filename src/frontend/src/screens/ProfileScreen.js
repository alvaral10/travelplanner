import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/auth');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" gutterBottom>User Profile</Typography>
            <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 3 }}>
                Logout
            </Button>
        </Box>
    );
};

export default ProfileScreen;
