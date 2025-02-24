import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

const ItineraryScreen = () => {
    const [itineraries, setItineraries] = useState([]);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [details, setDetails] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/itineraries');
            setItineraries(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch itineraries.');
            console.error('Error fetching itineraries:', error);
        }
    };

    const handleSaveItinerary = async () => {
        try {
            const itinerary = { destination, startDate, endDate, details };
            if (editingId) {
                await axios.put(`http://localhost:8080/api/itineraries/${editingId}`, itinerary);
                setEditingId(null);
            } else {
                await axios.post('http://localhost:8080/api/itineraries', itinerary);
            }
            setDestination('');
            setStartDate('');
            setEndDate('');
            setDetails('');
            fetchItineraries();
        } catch (error) {
            Alert.alert('Error', 'Failed to save itinerary.');
            console.error('Error saving itinerary:', error);
        }
    };

    const handleDeleteItinerary = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/itineraries/${id}`);
            fetchItineraries();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete itinerary.');
            console.error('Error deleting itinerary:', error);
        }
    };

    const handleEditItinerary = (item) => {
        setEditingId(item.id);
        setDestination(item.destination);
        setStartDate(item.startDate);
        setEndDate(item.endDate);
        setDetails(item.details);
    };

    return (
        <View>
            <Text>Itinerary Management</Text>
            <TextInput placeholder="Destination" value={destination} onChangeText={setDestination} />
            <TextInput placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} />
            <TextInput placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} />
            <TextInput placeholder="Details" value={details} onChangeText={setDetails} />
            <Button title={editingId ? "Update Itinerary" : "Add Itinerary"} onPress={handleSaveItinerary} />
            <FlatList
                data={itineraries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.destination} ({item.startDate} - {item.endDate})</Text>
                        <Text>{item.details}</Text>
                        <Button title="Edit" onPress={() => handleEditItinerary(item)} />
                        <Button title="Delete" onPress={() => handleDeleteItinerary(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default ItineraryScreen;
