import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ title, onPress, loading, color = '#007bff' }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{title}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;
