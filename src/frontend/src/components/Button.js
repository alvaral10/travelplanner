import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const CustomButton = ({
                          title,
                          onClick, // Use `onClick` instead of `onPress` for web
                          loading = false,
                          color = 'primary',
                          disabled = false,
                          width = '90%'
                      }) => {
    return (
        <Button
            variant="contained"
            color={color}
            onClick={onClick} // Correct event for web
            disabled={loading || disabled}
            sx={{ width: width, padding: '12px', borderRadius: '8px', marginBottom: '10px' }}
        >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : title}
        </Button>
    );
};

export default CustomButton;
