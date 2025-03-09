import React, { useState } from 'react';
import { View, Alert, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/auth/login';

const AuthScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: email.trim(),
                password: password.trim()
            });

            await AsyncStorage.setItem('token', response.data.token);
            Alert.alert('Success', 'Login successful!');
            navigation.replace('Itinerary');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid credentials';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button title="Login" onPress={handleLogin} loading={loading} />
            </View>
        </TouchableWithoutFeedback>
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
});

export default AuthScreen;
