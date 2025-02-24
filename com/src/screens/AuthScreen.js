import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const ItineraryScreen = ({ navigation }) => {
    const [itineraries, setItineraries] = useState([]);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [details, setDetails] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

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
            Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to fetch itineraries. Please login.' });
            navigation.navigate('Auth');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveItinerary = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const itinerary = { destination, startDate, endDate, details };
            const config = { headers: { Authorization: `Bearer ${token}` } };
            if (editingId) {
                await axios.put(`http://localhost:8080/api/itineraries/${editingId}`, itinerary, config);
                setEditingId(null);
                Toast.show({ type: 'success', text1: 'Success', text2: 'Itinerary updated successfully.' });
            } else {
                await axios.post('http://localhost:8080/api/itineraries', itinerary, config);
                Toast.show({ type: 'success', text1: 'Success', text2: 'Itinerary added successfully.' });
            }
            setDestination('');
            setStartDate('');
            setEndDate('');
            setDetails('');
            fetchItineraries();
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to save itinerary. Please login.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItinerary = async (id) => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/itineraries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchItineraries();
            Toast.show({ type: 'success', text1: 'Deleted', text2: 'Itinerary deleted successfully.' });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to delete itinerary. Please login.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Itinerary Management</Text>
            {loading && <ActivityIndicator size="large" color="#007BFF" />}
            <TextInput style={styles.input} placeholder="Destination" value={destination} onChangeText={setDestination} />
            <TextInput style={styles.input} placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} />
            <TextInput style={styles.input} placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} />
            <TextInput style={styles.input} placeholder="Details" value={details} onChangeText={setDetails} />
            <TouchableOpacity style={styles.button} onPress={handleSaveItinerary} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{editingId ? "Update Itinerary" : "Add Itinerary"}</Text>}
            </TouchableOpacity>
            <FlatList
                data={itineraries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.destination} ({item.startDate} - {item.endDate})</Text>
                        <Text>{item.details}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItinerary(item.id)} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Delete</Text>}
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Toast />
        </View>
    );
};

export default ItineraryScreen;