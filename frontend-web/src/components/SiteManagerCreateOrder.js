import React, { useState, useEffect } from 'react';

function SiteManagerCreateOrder() {

    const [orderName, setOrderName] = useState(''); // State for order name
    const [orderDetails, setOrderDetails] = useState([
        { itemName: '', quantity: 1 },
    ]);
    const [items, setItems] = useState([]);

    // Fetch items from your API
    useEffect(() => {
        fetch('http://localhost:8080/item/getAllItems')
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    const addInputField = () => {
        setOrderDetails([...orderDetails, { itemName: '', quantity: 1 }]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDetails = [...orderDetails];
        updatedDetails[index][name] = value;
        setOrderDetails(updatedDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create an order
            const orderResponse = await fetch('http://localhost:8080/order/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: orderName, // Use the order name from the input field
                    total: 0,
                    status: 'Pending',
                }),
            });
            const orderData = await orderResponse.json();

            // Initialize variables for order item calculations
            let total = 0;
            const orderItemData = [];

            // Calculate item totals and update total
            for (const orderItem of orderDetails) {
                const item = items.find((item) => item.name === orderItem.itemName);
                if (item) {
                    const itemTotal = item.avgunitprice * orderItem.quantity;
                    total += itemTotal;
                    orderItemData.push({
                        order: orderData._id,
                        item: item._id,
                        qty: orderItem.quantity,
                        avgunitprice: item.avgunitprice,
                        itemtotal: itemTotal,
                    });
                }
            }

            // Update the order total
            const updatedOrder = {
                total: total,
            };

            // Update the order with the calculated total
            const updateOrderResponse = await fetch(
                'http://localhost:8080/order/updateOrder/' + orderData._id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                }
            );
            const updatedOrderData = await updateOrderResponse.json();

            // Create order items
            for (const orderItem of orderItemData) {
                await fetch('http://localhost:8080/orderItem/createOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderItem),
                });
            }

            console.log('Order created:', updatedOrderData);
            alert('Order created')
            window.location.reload('/SiteManagerCreateOrder')
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Order Name Input Field */}
                <input
                    type="text"
                    placeholder="Order Name"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                />

                {orderDetails.map((order, index) => (
                    <div key={index} className="flex space-x-4">
                        <select
                            name="itemName"
                            value={order.itemName}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-1/2 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select an item</option>
                            {items.map((item) => (
                                <option key={item._id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={order.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-1/4 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                ))}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={addInputField}
                        className="text-blue-500 hover:underline"
                    >
                        Add Item
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SiteManagerCreateOrder;
