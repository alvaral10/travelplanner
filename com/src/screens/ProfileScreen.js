import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        if (!user.name || !user.email) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put('http://localhost:8080/api/auth/profile', user, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        Alert.alert('Logged Out', 'You have been logged out successfully.');
        navigation.replace('Auth');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={user.name}
                        onChangeText={(text) => setUser({ ...user, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        keyboardType="email-address"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Profile</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
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
    logoutButton: {
        backgroundColor: '#dc3545',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
