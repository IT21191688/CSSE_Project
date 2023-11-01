import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SupplierView() {
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [orderDetails, setOrderDetails] = useState([]);

    

    useEffect(() => {
        function getOrderDetails() {
            axios.get("http://localhost:8080/order/getAllOrders")
                .then(function (res) {
                    setOrderDetails(res.data);
                })
                .catch(function (err) {
                    console.error("Data not fetched", err);
                });
        }
        getOrderDetails();
    }, []);

    

    const filteredData = orderDetails
        .filter((item) => (
            item.name && item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.status === 'Approved' 
        ));
    



    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";

        const marginLeft = 400;
        const margin = 20
        const doc = new jsPDF(orientation, unit, size);

        const title = "All Orders Table Details";
        const headers = ["Order Id", "Order Name", "Total Cost", "Status"];
        const data = filteredData.map((rep) => [
            rep._id,
            rep.name,
            rep.total,
            rep.status,
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

        doc.autoTable(content);
        doc.save("AllOrderDetails.pdf");
    }



    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-4xl font-semibold mb-4">Approved Order Details</h1>

            <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white">
                <div className="bg-white shadow-lg p-4 flex items-center justify-between">
                    <div className="relative w-3/4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-96 py-2 pl-8 pr-3 border rounded-lg"
                        />
                        <div className="absolute top-0 left-2 mt-2 text-gray-500">
                            {/*  search icon  */}
                            <i className="fas fa-search"></i>
                        </div>
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
                        <th className="py-2 px-4 font-semibold">Order Name</th>
                        <th className="py-2 px-4 font-semibold">Total Cost</th>
                        <th className="py-2 px-4 font-semibold">Status</th>
                        <th className="py-2 px-4 font-semibold">View Details</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.total}</td>
                            <td className="py-2 px-4">{item.status}</td>
                            <td className="py-2 px-4">
                                <Link to={`/supplierOrderView/${item._id}`}>
                                    <button className="text-blue-500 hover:underline">Details</button>
                                </Link>
                            </td>
                            <td className="py-2 px-4">
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
