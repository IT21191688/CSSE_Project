import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../images/image1.jpg'; // Import the images
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';

export default function ManagerHome() {
    return (
        <div className="h-screen flex flex-wrap justify-center items-center">
            <Link to="/orderManagement">
                <div className="w-96 h-96 bg-blue-200 rounded-lg p-4 m-4 flex flex-col items-center">
                    <img src={image1} alt="Image 1" className="w-30 h-30 rounded-full" /> {/* Use the imported images */}
                    <div className="mt-5 font-bold text-3xl">Orders</div>
                </div>
            </Link>
            <Link to="/invoiceManagement">
                <div className="w-96 h-96 bg-green-200 rounded-lg p-4 m-4 flex flex-col items-center">
                    <img src={image2} alt="Image 2" className="w-30 h-30 rounded-full" />
                    <div className="mt-5 font-bold text-3xl">Invoices</div>
                </div>
            </Link>
            <Link to="/paymentDetails">
                <div className="w-96 h-96 bg-yellow-200 rounded-lg p-4 m-4 flex flex-col items-center">
                    <img src={image3} alt="Image 3" className="w-30 h-30 rounded-full" />
                    <div className="mt-5 font-bold text-3xl">Payments</div>
                </div>
            </Link>
        </div>
    );
}
