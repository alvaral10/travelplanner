import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    TextField,
    Avatar,
    Stack,
    CircularProgress,
} from '@mui/material';

const ProfileScreen = () => {
    const navigate = useNavigate();

    const [profilePic, setProfilePic] = useState('');
    const [interests, setInterests] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { profilePicture, interests, aboutMe } = res.data;
                setProfilePic(profilePicture);
                setInterests(interests || '');
                setAboutMe(aboutMe || '');
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicFile(file);
            setProfilePic(URL.createObjectURL(file)); // Preview
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');

            // If a new profile pic is selected, upload it first
            if (profilePicFile) {
                const formData = new FormData();
                formData.append('image', profilePicFile);

                const uploadRes = await axios.post('/api/profile/upload-picture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfilePic(uploadRes.data.profilePictureUrl); // Optional: update state with new URL
            }

            // Save profile info
            await axios.put(
                '/api/profile',
                { interests, aboutMe },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Something went wrong. Try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/auth');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" px={2}>
            <Typography variant="h4" gutterBottom>Update Profile</Typography>

            {/* Profile Picture Upload */}
            <Stack spacing={2} alignItems="center" mb={3}>
                <Avatar src={profilePic} sx={{ width: 100, height: 100 }} />
                <Button variant="outlined" component="label">
                    Upload Picture
                    <input hidden type="file" accept="image/*" onChange={handleProfilePicChange} />
                </Button>
            </Stack>

            {/* About Me Field */}
            <TextField
                label="About Me"
                multiline
                rows={4}
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* Interests Field */}
            <TextField
                label="Interests"
                placeholder="e.g., Travel, Cooking, Tech"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                fullWidth
                margin="normal"
            />

            {/* Buttons */}
            <Box mt={3} display="flex" flexDirection="column" gap={2} width="100%">
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Profile'}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/itinerary')}>Go to Itinerary</Button>
                <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
            </Box>
        </Box>
    );
};

export default ProfileScreen;
