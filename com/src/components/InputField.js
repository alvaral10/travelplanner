import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '90%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});

export default InputField;
