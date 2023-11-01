import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate  } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SupplierOrderView() {
    const { orderId } = useParams();
    const [search, setSearch] = useState('');
    const [orderDetails, setOrderDetails] = useState({});
    const [orderItemDetails, setOrderItemDetails] = useState([]);
    const navigate = useNavigate(); // Use useNavigate to navigate


    useEffect(() => {
        async function fetchData() {
          try {
            const orderResponse = await axios.get(`http://localhost:8080/order/getOneOrder/${orderId}`);
            setOrderDetails(orderResponse.data);
    
            const itemResponse = await axios.get(`http://localhost:8080/orderItem/getOrderItemsByOrderID/${orderId}`);
            setOrderItemDetails(itemResponse.data);
          } catch (error) {
            console.error("Error fetching data: " + error);
          }
        }
    
        fetchData();
      }, [orderId]);
    
      const redirectToInvoiceForm = () => {
        navigate(`/InvoiceForm/${orderId}`); // Use navigate to redirect
      };





    // Filter order items based on the search input
    let filteredItems = [];
    if (Array.isArray(orderItemDetails)) {
        filteredItems = orderItemDetails.filter((item) => (
            item.item.name && item.item.name.toLowerCase().includes(search.toLowerCase())
        ));
    }

    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 400;
        const margin = 20;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Order Table Details";
        const headers = ["Item Name", "Quantity", "Unit Price", "Item Total"];
        const data = filteredItems.map((rep) => [
            rep.itemName,
            rep.qty,
            rep.unitPrice,
            rep.itemTotal,
        ]);

        let content = {
            startY: 70,
            head: [headers],
            body: data,
        };

        doc.setFontSize(18);
        doc.text(title, marginLeft, 40);

        // Add Order Name, Status, and Total Price to the header
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
                    Order Name: {orderDetails.name}<br />
                    Total Cost: ${orderDetails.total}<br />
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l-7-7 7-7m4 14l7-7-7-7"></path>
                            </svg>
                        </button>

                        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto">
      
      <button
        className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-md hover-bg-purple-600"
        onClick={redirectToInvoiceForm}
      >
        <span className="mr-2">Invoice</span>
      </button>
    </div>

                        
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
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.item.name}</td>
                            <td className="py-2 px-4">{item.qty}</td>
                            <td className="py-2 px-4">{item.item.avgunitprice}</td>
                            <td className="py-2 px-4">{item.itemtotal}</td>
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
