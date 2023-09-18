import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    KeyboardAvoidingView,
    TextInput,
} from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminHome = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const role = "user";
    const navigation = useNavigation();


    /*
    const [clientIP, setClientIP] = useState(null);

    useEffect(() => {
        // Function to fetch the client's IP address
        const fetchClientIP = async () => {
            try {
                const response = await fetch('http://localhost:8082/getip');
                if (response.ok) {
                    const data = await response.json();
                    setClientIP(data.ip);
                } else {
                    console.error('Failed to fetch IP:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching IP:', error);
            }
        };

        // Call the function to fetch the IP address when the component mounts
        fetchClientIP();
    }, []);

    */

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://192.168.43.93:8082/auth/register`, {
                firstname,
                lastname,
                email,
                age,
                dob,
                password,
                role
            });

            // Check if the response indicates success (you may need to adjust this based on your backend's response format)
            if (response.status === 200) {
                console.log('Registration successful:', response.data);
                // Handle success, e.g., navigate to the next screen
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
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={styles.logo}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                {/* First Name */}
                <View style={styles.inputField}>
                    <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
                    <TextInput
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        style={styles.input}
                        placeholder="Enter your First Name"
                    />
                </View>

                {/* Last Name */}
                <View style={styles.inputField}>
                    <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
                    <TextInput
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        style={styles.input}
                        placeholder="Enter your Last Name"
                    />
                </View>

                {/* Age */}
                <View style={styles.inputField}>
                    <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
                    <TextInput
                        value={age}
                        onChangeText={(text) => setAge(text)}
                        style={styles.input}
                        placeholder="Enter your Age"
                        keyboardType="numeric"
                    />
                </View>

                {/* Date of Birth */}
                <View style={styles.inputField}>
                    <Icon name="calendar" size={20} color="gray" style={styles.inputIcon} />
                    <TextInput
                        value={dob}
                        onChangeText={(text) => setDob(text)}
                        style={styles.input}
                        placeholder="Date of Birth (e.g., YYYY-MM-DD)"
                    />
                </View>

                {/* Email */}
                <View style={styles.inputField}>
                    <Icon name="envelope" size={20} color="gray" style={styles.inputIcon} />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                        placeholder="Enter your Email"
                    />
                </View>

                {/* Password */}
                <View style={styles.inputField}>
                    <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Enter your Password"
                    />
                </View>

                {/* Register Button */}
                <Pressable
                    onPress={handleRegister}
                    style={styles.registerButton}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("LoginScreen")}
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        You already have an account? Sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 0,
    },
    logo: {
        width: 150,
        height: 100,
    },
    inputField: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#D0D0D0",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 15,
        height: 50,
        width: 300,
    },
    input: {
        color: "gray",
        width: "100%",
        fontSize: 16, // Fixed font size for placeholder
    },
    inputIcon: {
        marginLeft: 10,
    },
    registerButton: {
        width: 200,
        backgroundColor: "#FEBE10",
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 15,
        marginTop: 30,
    },
});

export default AdminHome;
