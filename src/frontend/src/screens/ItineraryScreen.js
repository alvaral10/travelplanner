import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box, Typography, Button, CircularProgress, List, ListItem,
    ListItemText, IconButton, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const ItineraryScreen = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ title: '', destination: '', startDate: '', endDate: '', details: '' });
    const [selectedId, setSelectedId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchItineraries();
    }, []);

    // ✅ Fetch itineraries for the logged-in user
    const fetchItineraries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log("DEBUG: Retrieved token →", token); // ✅ Log token before sending request

            if (!token) {
                setErrorMessage('User not authenticated. Please login.');
                return;
            }

            const response = await axios.get(`${API_URL}/itineraries/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("DEBUG: API response →", response.data); // ✅ Log API response
            setItineraries(response.data);
        } catch (error) {
            console.error("DEBUG: Error fetching itineraries →", error.response);
            setErrorMessage(error.response?.data?.error || 'Error fetching itineraries');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handles input change for form fields
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Opens the modal for adding/editing itinerary
    const handleOpen = (itinerary = null) => {
        if (itinerary) {
            setEditMode(true);
            setSelectedId(itinerary.id);
            setFormData({
                title: itinerary.title,
                destination: itinerary.destination,
                startDate: itinerary.startDate,
                endDate: itinerary.endDate,
                details: itinerary.details || ''
            });
        } else {
            setEditMode(false);
            setSelectedId(null);
            setFormData({ title: '', destination: '', startDate: '', endDate: '', details: '' });
        }
        setOpen(true);
    };

    // ✅ Handles form submission for adding/updating itinerary
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('User not authenticated. Please login.');
            return;
        }

        if (!formData.title || !formData.destination || !formData.startDate || !formData.endDate) {
            setErrorMessage('All required fields must be filled');
            return;
        }

        try {
            if (editMode) {
                await axios.put(`${API_URL}/itineraries/${selectedId}`, formData, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
                setSuccessMessage('Itinerary updated successfully!');
            } else {
                await axios.post(`${API_URL}/itineraries`, formData, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
                setSuccessMessage('Itinerary added successfully!');
            }
            setOpen(false);
            fetchItineraries();
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Error saving itinerary');
        }
    };

    // ✅ Deletes an itinerary (with confirmation)
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('User not authenticated. Please login.');
            return;
        }

        try {
            await axios.delete(`${API_URL}/itineraries/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccessMessage('Itinerary deleted successfully!');
            fetchItineraries();
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Error deleting itinerary');
        }
    };

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/auth');
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Itinerary List</Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                    Add Itinerary
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate('/profile')}>
                    Profile
                </Button>
                <Button variant="contained" color="error" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>

            {loading ? <CircularProgress /> : (
                <List>
                    {itineraries.length > 0 ? itineraries.map((item) => (
                        <ListItem key={item.id} secondaryAction={
                            <>
                                <IconButton edge="end" color="primary" onClick={() => handleOpen(item)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" color="error" onClick={() => handleDelete(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={item.title}
                                secondary={`Destination: ${item.destination}, Dates: ${item.startDate} - ${item.endDate}`}
                            />
                        </ListItem>
                    )) : <Typography>No itineraries found.</Typography>}
                </List>
            )}

            {/* Modal for Adding/Editing Itinerary */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editMode ? "Edit Itinerary" : "Add Itinerary"}</DialogTitle>
                <DialogContent>
                    <TextField label="Title" name="title" value={formData.title} onChange={handleInputChange} fullWidth margin="dense" required />
                    <TextField label="Destination" name="destination" value={formData.destination} onChange={handleInputChange} fullWidth margin="dense" required />
                    <TextField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} required />
                    <TextField label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} required />
                    <TextField label="Details" name="details" value={formData.details} onChange={handleInputChange} fullWidth margin="dense" multiline rows={3} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">{editMode ? "Update" : "Save"}</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notifications */}
            <Snackbar open={!!errorMessage} autoHideDuration={4000} onClose={() => setErrorMessage('')}>
                <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
            <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage('')}>
                <Alert severity="success">{successMessage}</Alert>
            </Snackbar>
        </Box>
    );
};

export default ItineraryScreen;
