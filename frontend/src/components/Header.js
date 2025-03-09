import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have this installed

const Header = ({ title, onProfilePress, onLogoutPress }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonContainer}>
                {onProfilePress && (
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={onProfilePress}
                        accessibilityRole="button"
                        accessible={true}
                        accessibilityLabel="Go to Profile"
                    >
                        <Icon name="person" size={18} color="#fff" style={styles.icon} />
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>
                )}
                {onLogoutPress && (
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={onLogoutPress}
                        accessibilityRole="button"
                        accessible={true}
                        accessibilityLabel="Logout"
                    >
                        <Icon name="logout" size={18} color="#fff" style={styles.icon} />
                        <Text style={styles.buttonText}>Logout</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        elevation: 3, // Adds a shadow effect for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#28a745',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 5,
    },
});

export default Header;
