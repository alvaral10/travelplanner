import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Itinerary" component={ItineraryScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
