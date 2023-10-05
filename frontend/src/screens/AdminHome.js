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
    TouchableOpacity
} from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminHome = () => {
    const navigation = useNavigation();

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

    return (
        <>
            <Text>Admin Home</Text>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

        </>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 0,
    },

});

export default AdminHome;
