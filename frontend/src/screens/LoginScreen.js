import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
} from "react-native";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://192.168.43.93:8082/auth/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                // Extract the token and role from the response data
                const { token, role } = response.data;

                // Store the token and role in local storage
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('role', role);

                // If login is successful, navigate to the appropriate screen based on the user's role
                if (role === 'admin') {
                    navigation.navigate('AdminHome');

                } else {
                    navigation.navigate('UserHome');
                }
            } else {
                console.error('Login failed:', response.statusText);
                // Handle login failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error, e.g., show an error message to the user
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
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            color: "#041E42",
                            marginBottom: 20,
                        }}
                    >
                        Login In to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            height: 60,
                        }}
                    >
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                flex: 1,
                                fontSize: email ? 16 : 16,
                                height: 40, // Reduce the height
                                paddingHorizontal: 10,
                            }}
                            placeholder="enter your Email"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            width: 350,
                            height: 60,
                            marginBottom: 10,
                        }}
                    >
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                flex: 1,
                                fontSize: password ? 16 : 16,
                                height: 40, // Reduce the height
                                paddingHorizontal: 10,
                            }}
                            placeholder="enter your Password"
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: "#007FFF", fontWeight: "500", marginLeft: 20 }}>Forgot Password</Text>
                </View>

                <Pressable
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Pressable
                    style={styles.googleButton}
                >
                    <Icon name="google" size={24} color="white" style={styles.googleIcon} />
                    <Text style={styles.buttonText}>Google Login</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("RegisterScreen")}
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        Don't have an account? Sign Up
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
    loginButton: {
        width: 200,
        backgroundColor: "#FEBE10",
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 40,
        padding: 15,
    },
    googleButton: {
        width: 200,
        height: 50,
        backgroundColor: "#DB4437",
        borderRadius: 6,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    googleIcon: {
        marginRight: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LoginScreen;
