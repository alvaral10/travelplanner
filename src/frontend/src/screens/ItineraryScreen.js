import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const ItineraryScreen = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/itineraries`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            alert('Error fetching itineraries');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Itinerary List</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/home')} sx={{ mb: 2 }}>
                Back to Home
            </Button>
            {loading ? <CircularProgress /> : (
                <List>
                    {itineraries.map((item) => (
                        <ListItem key={item.id} secondaryAction={
                            <IconButton edge="end" color="error" onClick={() => console.log('Delete', item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemText primary={item.destination} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default ItineraryScreen;
