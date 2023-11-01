import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function InvoiceCreatePage() {
  const route = useRoute();
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [orderItemDetails, setOrderItemDetails] = useState([]);
  const [filteredOrderItemDetails, setFilteredOrderItemDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const orderResponse = await axios.get(`http://192.168.47.17:8080/order/getOneOrder/${route.params.orderId}`);
        setOrderDetails(orderResponse.data);

        const itemResponse = await axios.get(`http://192.168.47.17:8080/orderItem/getOrderItemsByOrderID/${route.params.orderId}`);
        setOrderItemDetails(itemResponse.data);
        setFilteredOrderItemDetails(itemResponse.data);
      } catch (error) {
        console.error('Error fetching data: ' + error);
      }
    }

    fetchData();
  }, [route.params.orderId]);

  useEffect(() => {
    const filteredItems = orderItemDetails.filter(item =>
      item.item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrderItemDetails(filteredItems);
  }, [search, orderItemDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.orderHeader}>Order Details</Text>
        <Text style={styles.orderInfo}>Order Name: {orderDetails.name}</Text>
        <Text style={styles.orderInfo}>Total Cost: ${orderDetails.total}</Text>
        <Text style={styles.orderInfo}>Status: {orderDetails.status}</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search for items"
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <TouchableOpacity style={styles.invoiceButton} onPress={() => navigation.navigate('InvoiceForm', { orderId: route.params.orderId })}>
          <Text style={styles.buttonText}>Invoice</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredOrderItemDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? '#F0F0F0' : 'white' }]}>
            <Text style={styles.itemName}>{item.item.name}</Text>
            <Text style={styles.itemInfo}>Quantity: {item.qty}</Text>
            <Text style={styles.itemInfo}>Unit Price(RS): {item.item.avgunitprice}</Text>
            <Text style={styles.itemInfo}>Item Total(RS): {item.itemtotal}</Text>
          </View>
        )}
      />
      <Text style={styles.totalCost}>Total Cost: ${orderDetails.total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#fff',
    paddingTop:40,
  },
  orderDetailsContainer: {
    paddingLeft: 130,
    marginBottom: 16,
    paddingBottom:20,
    backgroundColor: '#3EC3C3',
    //paddingTop:10,

  },
  orderHeader: {
    paddingTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  invoiceButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
    alignItems: 'center',
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  totalCost: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
