import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({
                    title,
                    onPress,
                    loading = false,
                    color = '#007bff',
                    disabled = false,
                    width = '90%'
                }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: disabled || loading ? '#A9A9A9' : color, width: width } // Disabled style
            ]}
            onPress={onPress}
            disabled={loading || disabled}
            activeOpacity={0.7} // Better touch feedback
            accessibilityRole="button"
            accessible={true}
            accessibilityLabel={title}
        >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{title}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;
