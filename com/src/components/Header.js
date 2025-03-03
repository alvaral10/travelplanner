import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ title, onProfilePress, onLogoutPress }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                {onProfilePress && (
                    <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
                        <Text style={styles.profileText}>Profile</Text>
                    </TouchableOpacity>
                )}
                {onLogoutPress && (
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    profileText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Header;
