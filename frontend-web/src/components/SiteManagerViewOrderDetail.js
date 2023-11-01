import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function SiteManagerViewOrderDetail() {
    const { orderId } = useParams();

    const [search, setSearch] = useState('');
    const [orderDetails, setOrderDetails] = useState({});
    const [orderItemDetails, setOrderItemDetails] = useState([]);
    const [editMode, setEditMode] = useState({});
    const [editedQuantities, setEditedQuantities] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const orderResponse = await axios.get(`http://localhost:8080/order/getOneOrder/${orderId}`);
                setOrderDetails(orderResponse.data);

                const itemResponse = await axios.get(`http://localhost:8080/orderItem/getOrderItemsByOrderID/${orderId}`);
                setOrderItemDetails(itemResponse.data);

                const initialEditMode = {};
                const initialEditedQuantities = {};
                itemResponse.data.forEach((item) => {
                    initialEditMode[item._id] = false;
                    initialEditedQuantities[item._id] = item.qty;
                });
                setEditMode(initialEditMode);
                setEditedQuantities(initialEditedQuantities);
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }

        fetchData();
    }, [orderId]);

    const toggleEditMode = (itemId) => {
        setEditMode({ ...editMode, [itemId]: !editMode[itemId] });
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity >= 0) {
            setEditedQuantities({ ...editedQuantities, [itemId]: newQuantity });
        }
    };

    const saveEditedQuantities = (orderId, itemId) => { // Add 'orderId' as a parameter
        const newQuantity = editedQuantities[itemId];

        alert(orderId+"    "+itemId);
    
        axios
            .put(`http://localhost:8080/orderItem/updateOrderItems/652d3eb16a46d21dc697000c/652d0e36f61f33727fb307c5`, { qty: newQuantity })
            .then(() => {
                toggleEditMode(itemId);
                alert("Quantity updated successfully.");
                const updatedOrderItemDetails = [...orderItemDetails];
                const editedItemIndex = updatedOrderItemDetails.findIndex((item) => item._id === itemId);
                if (editedItemIndex !== -1) {
                    updatedOrderItemDetails[editedItemIndex].qty = newQuantity;
                    setOrderItemDetails(updatedOrderItemDetails);
                }
            })
            .catch((error) => {
                console.error('Error updating quantity: ', error);
                alert('Error updating quantity: ' + error.message);
            });
    };
    
    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 400;
        const margin = 20;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Order Table Details";
        const headers = ["Item Name", "Quantity", "Unit Price", "Item Total"];
        const data = orderItemDetails.map((item) => [
            item.item.name,
            editMode[item._id] ? (
                <div>
                    <input
                        type="number"
                        value={editedQuantities[item._id]}
                        onChange={(e) => updateQuantity(item._id, e.target.value)}
                    />
                    <button onClick={() => saveEditedQuantities(item._id)}>Save</button>
                </div>
            ) : (
                item.qty
            ),
            item.item.avgunitprice,
            item.itemtotal,
        ]);

        let content = {
            startY: 70,
            head: [headers],
            body: data,
        };

        doc.setFontSize(18);
        doc.text(title, marginLeft, 40);

        doc.setFontSize(12);
        doc.text(`Order Name: ${orderDetails.name}`, margin, 20);
        doc.text(`Status: ${orderDetails.status}`, margin, 30);
        doc.text(`Total Price: $${orderDetails.total}`, margin, 40);

        doc.autoTable(content);
        doc.save("OrderDetails.pdf");
    }

    return (
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto">
            <div className="w-52 md:w-2/3 lg:w-1/3 shadow-lg bg-white mx-auto p-2 float-left mt-5">
                <h1 className="text-lg font-semibold">Order Details</h1>
                <p className="text-sm">
                    Order Name: {orderDetails.name}
                    <br />
                    Total Cost: ${orderDetails.total}
                    <br />
                    Status: {orderDetails.status}
                </p>
            </div>
            <div className="flex justify-end pr-10 pt-10">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search for items"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mr-4 py-2 px-4 border rounded-lg"
                    />
                    <div className="flex items-center space-x-4">
                        <button
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={generatePdf}
                        >
                            <span className="mr-2">Print</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 19l-7-7 7-7m4 14l7-7-7-7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <table className="w-full shadow-lg bg-white my-4 mx-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 font-semibold">Item</th>
                        <th className="py-2 px-4 font-semibold">Quantity</th>
                        <th className="py-2 px-4 font-semibold">Unit Price(RS)</th>
                        <th className="py-2 px-4 font-semibold">Item Total(RS)</th>
                        <th className="py-2 px-4 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItemDetails.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.item.name}</td>
                            <td className="py-2 px-4">
                                {editMode[item._id] ? (
                                    <div>
                                        <input
                                            type="number"
                                            value={editedQuantities[item._id]}
                                            onChange={(e) => updateQuantity(item._id, e.target.value)}
                                        />
                                     <button onClick={() => saveEditedQuantities(orderDetails._id, item.item._id)}>Save</button>

                                    </div>
                                ) : (
                                    item.qty
                                )}
                            </td>
                            <td className="py-2 px-4">{item.item.avgunitprice}</td>
                            <td className="py-2 px-4">{item.itemtotal}</td>
                            <td className="py-2 px-4 space-x-2">
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                    onClick={() => toggleEditMode(item._id)}
                                >
                                    {editMode[item._id] ? "Cancel" : "Edit"}
                                </button>
                                <button className="bg-red-500 text-white py-1 px-2 rounded hover-bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-lg font-semibold float-right">
                Total Cost: {orderDetails.total}
            </p>
        </div>
    );
}

export default SiteManagerViewOrderDetail;
