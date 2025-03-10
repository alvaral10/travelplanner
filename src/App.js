import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ItineraryScreen from './frontend/src/screens/ItineraryScreen';
import AuthScreen from './frontend/src/screens/AuthScreen';
import RegisterScreen from './frontend/src/screens/RegisterScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
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
                {/* Redirect users based on authentication status */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth" />} />

                {/* Public Routes */}
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/register" element={<RegisterScreen />} />

                {/* Protected Routes */}
                {isAuthenticated && (
                    <>
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/itinerary" element={<ItineraryScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                    </>
                )}

                {/* Redirect unknown paths */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/auth"} />} />
            </Routes>
        </Router>
    );
}
