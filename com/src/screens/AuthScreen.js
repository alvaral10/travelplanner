import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';

const AuthScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            Alert.alert('Success', 'Login successful!');
            navigation.replace('Itinerary');
        } catch (error) {
            Alert.alert('Error', 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin} loading={loading} />
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
});

export default AuthScreen;
