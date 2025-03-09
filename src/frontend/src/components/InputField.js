import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const InputField = ({
                        placeholder,
                        value,
                        onChange,
                        type = 'text',
                        multiline = false,
                        maxLength = 100,
                        fullWidth = true,
                    }) => {
    return (
        <Box sx={{ width: fullWidth ? '90%' : 'auto', marginBottom: 2 }}>
            <TextField
                label={placeholder}
                value={value}
                onChange={onChange} // React Web uses `onChange`
                type={type}
                variant="outlined"
                multiline={multiline}
                inputProps={{ maxLength: maxLength }}
                fullWidth
            />
        </Box>
    );
};

export default InputField;
