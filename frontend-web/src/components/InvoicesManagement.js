import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function InvoicesManagement() {
    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        // Fetch invoices when the component mounts
        axios.get('http://localhost:8080/invoice/getAllInvoices')
            .then((response) => {
                setInvoices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching invoices:', error);
            });
    }, []); // Empty dependency array means this effect runs once on component mount

    // Filter invoices based on the search input
    const filteredInvoices = invoices.filter((invoice) =>
        invoice.ordername.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate the total cost
    const calculateTotalCost = () => {
        const total = filteredInvoices.reduce((acc, invoice) => {
            return acc + parseFloat(invoice.ordertotal);
        }, 0);
        setTotalCost(total);
    };

    useEffect(() => {
        calculateTotalCost();
    }, [filteredInvoices]);



    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";

        const marginLeft = 400;
        const margin = 20
        const doc = new jsPDF(orientation, unit, size);

        const title = "All Invoice Table Details";
        const headers = ["Order Name", "Order Total", "Actual Price"];
        const data = filteredInvoices.map((rep) => [

            rep.ordername,
            rep.ordertotal,
            rep.actualprice,
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
        doc.save("AllInvoicesListDetails.pdf");
    }


    return (
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto p-4 mt-5">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold">Invoice Details</h1>
            </div>

            <div className="flex justify-between items-center">
                <div className="w-1/3">
                    <input
                        type="text"
                        placeholder="Search for invoices"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="w-1/3 text-right">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={generatePdf}
                    >
                        Print
                    </button>
                </div>
            </div>

            <table className="w-full mt-4 shadow-lg bg-white">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="py-2 px-4 font-semibold">Order Name</th>
                        <th className="py-2 px-4 font-semibold">Order Total</th>
                        <th className="py-2 px-4 font-semibold">Actual Price</th>
                        <th className="py-2 px-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.map((invoice, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{invoice.ordername}</td>
                            <td className="py-2 px-4">${invoice.ordertotal}</td>
                            <td className="py-2 px-4">${invoice.actualprice}</td>
                            <td className="py-2 px-4">
                                <Link to={`/invoicePayment/${invoice._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Pay Now
                                    </button>
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-lg font-semibold text-right">
                Total Cost: ${totalCost}
            </p>
        </div>
    );
}
