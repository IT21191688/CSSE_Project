import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

function SuppliyerHome() {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Replace 'your-backend-api-endpoint' with the actual URL of your backend API.
        axios.get('http://192.168.47.17:8080/order/getAllOrders') // Fetch orders from your backend API
            .then(response => {
                const approvedOrders = response.data.filter(order => order.status === 'Approved');
                setOrders(approvedOrders);
                setFilteredOrders(approvedOrders);
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    const navigateToInvoiceCreate = (orderId) => {
        // Use navigation.navigate to go to the "Invoice Create" screen and pass the order ID as a parameter
        navigation.navigate('InvoiceCreatePage', { orderId });
    };

   

    const handleSearch = () => {
        const filtered = filteredOrders.filter(order => order.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredOrders(filtered);
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Supplier View - Approved Orders</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                    <Button title="Search" onPress={handleSearch} />
                </View>
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(order) => order._id}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>${item.total}</Text>
                            <Text style={styles.cell}>{item.status}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigateToInvoiceCreate(item._id)}
                            >
                                <Text style={styles.buttonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:10,
    
        top: 70,
    },
    title: {
        color: '#4933FF',
        fontSize: 24,
        textAlign: 'center',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
    },
    button: {
        backgroundColor: '#4933FF',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
    },
    searchContainer: {
        paddingTop:20,
        paddingBottom:40,
        borderColor: '#4933FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
    },
});

export default SuppliyerHome;
