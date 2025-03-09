import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const InputField = ({
                        placeholder,
                        value,
                        onChangeText,
                        secureTextEntry = false,
                        keyboardType = 'default',
                        autoCapitalize = 'none',
                        autoCompleteType = 'off',
                        multiline = false,
                        numberOfLines = 1,
                        maxLength = 100,
                        accessibilityLabel = placeholder
                    }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoComplete={autoCompleteType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                maxLength={maxLength}
                clearButtonMode="while-editing" // Shows clear button on iOS
                accessibilityLabel={accessibilityLabel}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    input: {
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    inputFocused: {
        borderColor: '#007bff', // Highlighted border color when focused
        borderWidth: 2,
    }
});

export default InputField;
