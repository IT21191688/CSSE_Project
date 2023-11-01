import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function InvoiceForm() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [newTotal, setNewTotal] = useState('');

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const orderResponse = await axios.get(`http://localhost:8080/order/getOneOrder/${orderId}`);
        setOrderDetails(orderResponse.data);
      } catch (error) {
        console.error("Error fetching order details: " + error);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  const handleSubmit = () => {
    // Send a request to create a new invoice directly with values
    axios
      .post(`http://localhost:8080/invoice/createInvoice`, {
        ordername: orderDetails.name,

        ordertotal: orderDetails.total,
        orderstatus: orderDetails.status,
        actualprice: newTotal,

      })
      .then(() => {
        alert('New invoice created successfully');
        // You can handle success here, e.g., navigate back to the previous page
      })
      .catch((error) => {
        console.error('Error creating invoice: ' + error);
        alert('Error creating invoice: ' + error.message);
      });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">Create Invoice</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Order Name:</label>
        <p className="text-gray-800">{orderDetails.name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Total Cost:</label>
        <p className="text-gray-800">${orderDetails.total}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Status:</label>
        <p className="text-gray-800">{orderDetails.status}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">New Total:</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            value={newTotal}
            onChange={(e) => setNewTotal(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>


        <Link to="/invoiceManagement">
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none">
          View Invoices
        </button>
      </Link>
      </form>
    </div>
  );
}

