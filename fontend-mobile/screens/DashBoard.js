import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const DashBoard = () => {

    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate('SuppliyerHome')
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Supplier Dashboard</Text>
            </View>
            <TouchableOpacity
                style={styles.box}
                onPress={handleNavigate}
            >
                <Text style={styles.boxText}>View Orders</Text>
            </TouchableOpacity>
            {/*
            <View style={styles.box}>
                <Text style={styles.boxText}>Component 2</Text>
            </View>
            
            <View style={styles.box}>
                <Text style={styles.boxText}>Component 3</Text>
            </View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 50,
        paddingtop:10,
        backgroundColor: '#3A7584',
    },
    header: {
        backgroundColor: '#3498db',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
    },
    box: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop:140,
        marginBottom:300,
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        borderWidth: 10,
        borderColor: '#ccc',
    },
    boxText: {
        fontSize: 22,
        //textAlign: 'justify'
        paddingVertical:120,
    },
});

export default DashBoard;