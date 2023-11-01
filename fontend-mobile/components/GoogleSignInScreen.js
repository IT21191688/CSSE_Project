import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";

const GoogleSignInScreen = () => {
    const navigation = useNavigation();

    const [webViewVisible, setWebViewVisible] = useState(false);

    const handleGoogleSignIn = () => {
        setWebViewVisible(true);
    };

    const handleWebViewMessage = (event) => {
        const data = JSON.parse(event.nativeEvent.data);

        if (data.token && data.role) {
            const { token, role } = data;

            // Store the token in local storage or perform necessary actions
            // For security reasons, you should use a secure storage mechanism

            // Close the WebView
            setWebViewVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Google Sign-In Example</Text>
            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleSignInButton}>
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
            {webViewVisible && (
                <WebView
                    source={{ uri: 'http://localhost:8080/auth/google' }}
                    onMessage={handleWebViewMessage}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    googleSignInButton: {
        backgroundColor: 'red', // Customize the background color
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', // Customize the text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GoogleSignInScreen;
