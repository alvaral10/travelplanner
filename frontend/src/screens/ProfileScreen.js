import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, RefreshControl, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/auth/profile';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to load profile';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        if (!user.name.trim() || !user.email.trim()) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put(API_URL, {
                name: user.name.trim(),
                email: user.email.trim(),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update profile';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        Alert.alert('Logged Out', 'You have been logged out successfully.');
        navigation.replace('Auth');
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUserProfile();
        setRefreshing(false);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
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
                        autoCapitalize="words"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.disabledButton]}
                        onPress={handleUpdateProfile}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Profile</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
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
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%',
        marginBottom: 10,
    },
    disabledButton: {
        backgroundColor: '#A9A9A9',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 12,
        paddingHorizontal: 20,
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
