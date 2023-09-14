import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

//sadeepa
//sandeepa
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    //const API_BASE_URL = 'http://localhost:8080/auth/login';

    const handleLogin = async (e) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/login`, { email, password });
            console.log('Login successful:', response.data);
            // Handle successful login, e.g., navigate to the main app screen
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error, e.g., show an error message to the user
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button
                title="Login"
                onPress={handleLogin}
                style={styles.loginButton}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate('RegisterScreen')}
                style={styles.loginButton}
            />
            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    loginButton: {
        width: '100%',
        marginBottom: 10,
    },
    googleButton: {
        backgroundColor: '#4285F4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    googleButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginScreen;
