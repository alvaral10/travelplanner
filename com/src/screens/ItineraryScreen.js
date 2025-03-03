import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Header from '../components/Header';

const ItineraryScreen = ({ navigation }) => {
    const [itineraries, setItineraries] = useState([]);
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/itineraries', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItineraries(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch itineraries');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!destination) {
            Alert.alert('Error', 'Destination cannot be empty');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (editingId) {
                await axios.put(`http://localhost:8080/api/itineraries/${editingId}`, { destination }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post('http://localhost:8080/api/itineraries', { destination }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setDestination('');
            setEditingId(null);
            fetchItineraries();
        } catch (error) {
            Alert.alert('Error', 'Failed to save itinerary');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/itineraries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchItineraries();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete itinerary');
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
            {/* Header with Profile and Logout */}
            <Header title="Itinerary" onProfilePress={() => navigation.navigate('Profile')} onLogoutPress={handleLogout} />

            {/* Input for New Itinerary */}
            <InputField placeholder="Enter Destination" value={destination} onChangeText={setDestination} />
            <Button title={editingId ? "Update Itinerary" : "Add Itinerary"} onPress={handleSave} loading={loading} />

            {/* Itinerary List */}
            {loading ? <ActivityIndicator size="large" color="#007bff" /> : (
                <FlatList
                    data={itineraries}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{item.destination}</Text>
                            <View style={styles.cardButtons}>
                                <TouchableOpacity style={styles.editButton} onPress={() => {
                                    setDestination(item.destination);
                                    setEditingId(item.id);
                                }}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    card: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
    },
    cardButtons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ItineraryScreen;
