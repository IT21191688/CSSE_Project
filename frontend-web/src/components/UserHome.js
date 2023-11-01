import React from "react";
import { Link, useNavigate } from "react-router-dom";
import procurementSystemImage from '../images/procumentManagementHome.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faDatabase, faTachometerAlt, faTruck } from '@fortawesome/free-solid-svg-icons'; // Import appropriate FontAwesome icons

export default function UserHome() {
  const navigate = useNavigate();

  const goTo = (route) => {
    navigate(route);
  };

  const supplierView = () => {
    navigate('/supplierView')
  }
  const Inventory = () => {
    navigate('/InventoryDetailsDisplay')
  }
  const SiteManagerViewOrder = () => {
    navigate('/SiteManagerViewOrder')
  }
  const handleManagerHome = () => {
    navigate('/managerHome')
  }
  const SiteManagerCreateOrder = () => {
    navigate('/SiteManagerCreateOrder')
  }

  return (
    <div className="user-home">
      {/* Slider Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto p-6">
          <div className="owl-carousel owl-theme">
            <div className="item relative">
              <img
                src={procurementSystemImage}
                alt="Procurement Management System"
                className="w-full h-auto"
              />
              <div className="cover absolute inset-0 flex items-center justify-center bg-opacity-60 bg-blue-900">
                <div className="container text-center">
                  <div className="header-content mb-6">
                    <div className="line h-1 bg-yellow-400 w-20 mx-auto mb-3"></div>
                    <h2 className="text-3xl font-semibold">Welcome to Our Management System</h2>
                    <h1 className="text-5xl font-extrabold">Efficient, Effective, Professional</h1>
                    <h4 className="text-lg font-semibold mt-4">Ensuring seamless management with state-of-the-art functionalities.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Action Section */}
      <h2 className="text-3xl mt-8 mb-5 text-center font-bold">Manage Your Operations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="action-card p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100" onClick={() => goTo('/SiteManagerCreateOrder')}>
          <FontAwesomeIcon icon={faDatabase} className="text-4xl text-blue-500" />
          <span className="text-lg font-semibold">Create Order</span>
        </div>
        <div className="action-card p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100" onClick={() => goTo('/InventoryDetailsDisplay')}>
          <FontAwesomeIcon icon={faDatabase} className="text-4xl text-blue-500" />
          <span className="text-lg font-semibold">Manage Inventory</span>
        </div>
        <div className="action-card p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100" onClick={() => goTo('/managerHome')}>
          <FontAwesomeIcon icon={faTachometerAlt} className="text-4xl text-yellow-500" />
          <span className="text-lg font-semibold">Order Manager Dashboard</span>
        </div>
        <div className="action-card p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100" onClick={() => goTo('/supplierView')}>
          <FontAwesomeIcon icon={faTruck} className="text-4xl text-red-500" />
          <span className="text-lg font-semibold">Suppliers</span>
        </div>
      </div>
    </div>

  );
}

