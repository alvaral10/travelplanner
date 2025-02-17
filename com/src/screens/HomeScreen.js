import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Welcome to Travel App</Text>
            <Button title="Go to Itinerary" onPress={() => navigation.navigate('Itinerary')} />
        </View>
    );
};

export default HomeScreen;
