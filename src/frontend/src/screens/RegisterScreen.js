import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // ✅ Handles form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handles user registration
    const handleRegister = async () => {
        const { firstName, lastName, email, password } = formData;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`${API_URL}/auth/register`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            setSuccess(response.data.message || 'Registration successful!');
            setTimeout(() => navigate('/auth'), 2000); // Redirect to login after success
        } catch (error) {
            setError(error.response?.data?.error || 'Error registering user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" gutterBottom>Register</Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} required />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} required />

            <Button variant="contained" color="primary" onClick={handleRegister} disabled={loading} sx={{ width: '100%', padding: '12px', mb: 2 }}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
            </Button>

            {/* ✅ Navigate to Login */}
            <Button variant="outlined" color="secondary" onClick={() => navigate('/auth')} sx={{ width: '100%', padding: '12px' }}>
                Back to Login
            </Button>
        </Box>
    );
};

export default RegisterScreen;
