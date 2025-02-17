import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const ItineraryScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View>
            <Text>Itinerary</Text>
            {users.map(user => (
                <Text key={user.id}>{user.name}</Text>
            ))}
        </View>
    );
};

export default ItineraryScreen;
