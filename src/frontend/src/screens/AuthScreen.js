import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // 👈 Make sure this path matches your firebase.js
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
            const token = await userCredential.user.getIdToken();

            // ✅ Store the Firebase token in localStorage
            localStorage.setItem('token', token);

            alert('Login successful!');
            navigate('/itinerary');
        } catch (error) {
            console.error('Firebase Login Error:', error);
            setError(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />

            <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading} sx={{ width: '100%', padding: '12px', mb: 2 }}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
            </Button>

            <Button variant="outlined" color="secondary" onClick={handleRegister} sx={{ width: '100%', padding: '12px' }}>
                Register
            </Button>
        </Box>
    );
};

export default AuthScreen;
