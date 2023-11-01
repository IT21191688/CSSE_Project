import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function SiteManagerViewOrder() {
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [orderDetails, setOrderDetails] = useState([]);
    const navigate = useNavigate();

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

    const deleteOrder = (id, status) => {
        if (status === 'Approved') {
            alert("Cannot delete an approved order.");
            return;
        }

        axios.delete(`http://localhost:8080/order/deleteOrder/${id}`)
            .then(() => {
                alert("Delete Success");
                navigate('/orderManagement');
            })
            .catch((error) => {
                console.error('Error deleting order: ', error);
                alert('Error deleting order: ' + error.message);
            });
    };

    const filteredData = orderDetails.filter((item) => (
        (selectedStatus === 'All' || (item.status && item.status.toLowerCase() === selectedStatus)) &&
        (item.name && item.name.toLowerCase().includes(search.toLowerCase()))
    ));

    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";

        const marginLeft = 400;
        const margin = 20;
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
            <h1 className="text-4xl font-semibold mb-4">Order Details</h1>

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
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
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
                        <th className="py-2 px-4 font-semibold">Order Name</th>
                        <th className="py-2 px-4 font-semibold">Total Cost</th>
                        <th className="py-2 px-4 font-semibold">Status</th>
                        <th className="py-2 px-4 font-semibold">View Details</th>
                        <th className="py-2 px-4 font-semibold">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.total}</td>
                            <td className="py-2 px-4">{item.status}</td>
                            <td className="py-2 px-4">
                                <Link to={`/SiteManagerViewOrderDetails/${item._id}`}>
                                    <button className="text-blue-500 hover:underline">Details</button>
                                </Link>
                            </td>
                            <td className="py-2 px-4">
                                <button className="text-blue-500 hover:underline" onClick={() => deleteOrder(item._id, item.status)} disabled={item.status === 'Approved'}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SiteManagerViewOrder;
