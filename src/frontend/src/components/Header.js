import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';

const Header = ({ title, onProfilePress, onLogoutPress }) => {
    return (
        <AppBar position="static" color="default" elevation={3}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Title */}
                <Typography variant="h6" color="inherit">
                    {title}
                </Typography>

                {/* Buttons Container */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {onProfilePress && (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<PersonIcon />}
                            onClick={onProfilePress}
                        >
                            Profile
                        </Button>
                    )}
                    {onLogoutPress && (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<LogoutIcon />}
                            onClick={onLogoutPress}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
