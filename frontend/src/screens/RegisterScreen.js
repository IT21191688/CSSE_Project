import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';



const RegisterScreen = () => {


    //const API_BASE_URL = 'http://localhost:8080/auth/register/';

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/auth/register`, {
                firstname,
                lastname,
                email,
                age,
                dob,
                password,
            });

            // Check if the response indicates success (you may need to adjust this based on your backend's response format)
            if (response.status === 200) {
                console.log('Registration successful:', response.data);
                // Handle success, e.g., navigate to the next screen
            } else {
                console.error('Registration failed with status code:', response.status);
                // Handle registration error, e.g., show an error message to the user
            }
        } catch (error) {
            // Handle network error
            if (error.message === 'Network Error') {
                console.error('Network error. Please check your internet connection.');
                // Handle network error, e.g., show an error message to the user
            } else {
                console.error('Registration error:', error);
                // Handle other types of errors, e.g., show an error message to the user
            }
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstname}
                onChangeText={text => setFirstname(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastname}
                onChangeText={text => setLastname(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={text => setAge(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={dob}
                onChangeText={text => setDob(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="Register" onPress={handleRegister} />
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
});

export default RegisterScreen;
