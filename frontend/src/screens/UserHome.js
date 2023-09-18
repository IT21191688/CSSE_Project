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
    Button,
    TouchableOpacity
} from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserHome = ({ navigation }) => {

    const [role, setRole] = useState(null);

    useEffect(() => {
        const retrieveUserRole = async () => {
            try {
                const storedRole = await AsyncStorage.getItem('role');
                setRole(storedRole);
            } catch (error) {
                console.error('Error retrieving user role:', error);
            }
        };

        retrieveUserRole();
    }, []);

    const handleLogout = async () => {
        try {
            // Clear the token and role from AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('role');

            navigation.navigate('LoginScreen');


        } catch (error) {
            console.error('Logout error:', error);
            // Handle any logout error, e.g., show an error message to the user
        }
    };

    const handleProfile = () => {
        // Implement your profile screen navigation logic here
        // You can use navigation.navigate('ProfileScreen') or any other appropriate navigation
    };

    const menuOptions = [
        { label: 'Profile', action: handleProfile },
        { label: 'Logout', action: handleLogout },
    ];


    return (
        <View>
            <Text>Hello User</Text>
            <Text>{role}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: 'red', // Button background color
        padding: 10,
        borderRadius: 5,
        marginTop: 10, // Adjust the top margin as needed
    },
    logoutButtonText: {
        color: 'white', // Button text color
        textAlign: 'center',
    },
});


export default UserHome;
