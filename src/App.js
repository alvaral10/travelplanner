import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ItineraryScreen from './frontend/src/screens/ItineraryScreen';
import AuthScreen from './frontend/src/screens/AuthScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    if (isAuthenticated === null) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/itinerary" element={<ItineraryScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
        </Router>
    );
}
