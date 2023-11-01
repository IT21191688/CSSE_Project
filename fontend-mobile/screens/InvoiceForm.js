import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";

function InvoiceCreatePage() {
    const route = useRoute();
    const { orderId } = route.params;
    const navigation = useNavigation();
    const [order, setOrder] = useState({});
    const [totalnew, setTotalNew] = useState('');

    useEffect(() => {
        // Fetch order details using the orderId
        axios.get(`http://192.168.47.17:8080/order/getOneOrder/${orderId}`)
            .then(response => {
                setOrder(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [orderId]);

    const createInvoice = () => {
        if (!totalnew) {
            // Handle validation or display an error message if the field is empty
            return;
        }

        axios.post('http://192.168.47.17:8080/invoice/createInvoice', {
            ordername: order.name, // Use the order name from the fetched order
            ordertotal: order.total,
            orderstatus: order.status,
            actualprice: totalnew,
        })
            .then(response => {
                // Handle success, e.g., navigate back to the previous screen
                navigation.navigate("SuppliyerHome");
            })
            .catch(err => {
                // Handle error, e.g., show an error message to the user
                console.error(err);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Invoice Create</Text>
            <Text style={styles.label}>Order ID: {order._id}</Text>
            <Text style={styles.label}>Order Name: {order.name}</Text>
            <Text style={styles.label}>Total: ${order.total}</Text>
            <Text style={styles.label}>Status: {order.status}</Text>
            <Text style={styles.label}>New Cost:</Text>
            <TextInput
                style={styles.input}
                value={totalnew.toString()} // Ensure that the value is a string
                onChangeText={(text) => setTotalNew(text)}
            />
           
            <Button
                title="Submit Invoice"
                onPress={createInvoice}
                color="#4933FF"
                style={styles.button}

            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        fontStyle:'italic'
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },

    button: {
        position: 'absolute',
        bottom: 16,

      },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingBottom: 10,
    },
});

export default InvoiceCreatePage;