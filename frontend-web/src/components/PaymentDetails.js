import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function PaymentDetails() {
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [paymentDetails, setPaymentDetails] = useState([]);

    useEffect(() => {
        // Define your API endpoint for fetching payment details
        const apiEndpoint = 'http://localhost:8080/payment/getAllPayments'; // Replace with your actual API endpoint

        // Fetch payment details using axios
        axios.get(apiEndpoint)
            .then((response) => {
                setPaymentDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching payment details: ', error);
            });
    }, []);

    const filteredData = paymentDetails.filter((item) =>
        (selectedStatus === 'All' || item.paymentstatus === selectedStatus) &&
        item.orderid.toLowerCase().includes(search.toLowerCase())
    );

    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";

        const marginLeft = 400;
        const margin = 20;
        const doc = new jsPDF(orientation, unit, size);

        const title = "All Payment Details";
        const headers = ["Order ID", "Amount", "Card Number", "Payment Status"];
        const data = filteredData.map((rep) => [
            rep.orderid,
            rep.cardno,
            rep.amount,
            rep.paymentstatus,
        ]);

        let content = {
            startY: 70,
            head: [headers],
            body: data,
        };

        doc.setFontSize(18);
        doc.text(title, marginLeft, 40);

        doc.autoTable(content);
        doc.save("AllPaymentDetails.pdf");
    }

    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-4xl font-semibold mb-4">Payment Details</h1>

            <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white">
                <div className="bg-white shadow-lg p-4 flex items-center justify-between">
                    <div className="relative w-3/4">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-96 py-2 pl-8 pr-3 border rounded-lg"
                        />
                        <div className="absolute top-0 left-2 mt-2 text-gray-500">
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    <div className="relative w-1/4">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full py-2 pr-3 border rounded-lg"
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>

                        </select>
                    </div>
                    <div className="relative w-1/4 p-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePdf}>
                            Print Details
                        </button>
                    </div>
                </div>
            </div>
            <table className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 font-semibold">Order ID</th>
                        <th className="py-2 px-4 font-semibold">Amount</th>
                        <th className="py-2 px-4 font-semibold">Card Number</th>
                        <th className="py-2 px-4 font-semibold">Payment Status</th>
                        <th className="py-2 px-4 font-semibold">View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.orderid}</td>
                            <td className="py-2 px-4">{item.amount}</td>
                            <td className="py-2 px-4">{item.cardno}</td>
                            <td className="py-2 px-4">{item.paymentstatus}</td>
                            <td className="py-2 px-4">
                                <Link to={`/payment-details/${item._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Details
                                    </button>
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
