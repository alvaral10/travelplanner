// ... all imports remain the same

const ItineraryScreen = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ destination: '', startDate: '', endDate: '' });
    const [selectedId, setSelectedId] = useState(null);
    const [suggestions, setSuggestions] = useState({ hotels: [], attractions: [], restaurants: [] });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchItineraries();
    }, []);

    useEffect(() => {
        if (formData.destination) {
            fetchSuggestions(formData.destination);
        } else {
            setSuggestions({ hotels: [], attractions: [], restaurants: [] });
        }
    }, [formData.destination]);

    const fetchItineraries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('User not authenticated. Please login.');
                return;
            }

            const response = await axios.get(`${API_URL}/itineraries/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItineraries(response.data);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Error fetching itineraries');
        } finally {
            setLoading(false);
        }
    };

    const fetchSuggestions = async (destination) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/suggestions/${destination}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Suggestion fetch failed", error);
            setSuggestions({ hotels: [], attractions: [], restaurants: [] });
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpen = (itinerary = null) => {
        if (itinerary) {
            setEditMode(true);
            setSelectedId(itinerary.id);
            setFormData({
                destination: itinerary.destination,
                startDate: itinerary.startDate,
                endDate: itinerary.endDate
            });
        } else {
            setEditMode(false);
            setSelectedId(null);
            setFormData({ destination: '', startDate: '', endDate: '' });
            setSuggestions({ hotels: [], attractions: [], restaurants: [] });
        }
        setOpen(true);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('User not authenticated. Please login.');
            return;
        }

        if (!formData.destination || !formData.startDate || !formData.endDate) {
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this itinerary?")) return;
        const token = localStorage.getItem('token');
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
                                primary={`Trip to ${item.destination}`}
                                secondary={`Dates: ${item.startDate} - ${item.endDate}`}
                            />
                        </ListItem>
                    )) : <Typography>No itineraries found.</Typography>}
                </List>
            )}

            {/* Modal for Adding/Editing Itinerary */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editMode ? "Edit Itinerary" : "Add Itinerary"}</DialogTitle>
                <DialogContent>
                    <TextField label="Destination" name="destination" value={formData.destination} onChange={handleInputChange} fullWidth margin="dense" required />
                    <TextField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} required />
                    <TextField label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} required />

                    {/* Suggestions Box */}
                    {formData.destination && (
                        <>
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>Suggestions for {formData.destination}:</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>🏨 Hotels:</Typography>
                            <List dense>{suggestions.hotels.map((h, idx) => <ListItem key={idx}><ListItemText primary={h} /></ListItem>)}</List>

                            <Typography variant="body2">🎡 Attractions:</Typography>
                            <List dense>{suggestions.attractions.map((a, idx) => <ListItem key={idx}><ListItemText primary={a} /></ListItem>)}</List>

                            <Typography variant="body2">🍽️ Restaurants:</Typography>
                            <List dense>{suggestions.restaurants.map((r, idx) => <ListItem key={idx}><ListItemText primary={r} /></ListItem>)}</List>
                        </>
                    )}
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
