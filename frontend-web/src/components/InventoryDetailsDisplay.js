import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function InventoryDetailsDisplay() {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);

  const updateInventory = (item) => {
    navigate(`/UpdateInventory/${item}`);
  };

  const deleteInventory = (inventoryId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:8080/inventory/deleteInventory/${inventoryId}`)
        .then((response) => {
          if (response.status === 200) {
            setInventory((prevInventory) =>
              prevInventory.filter((item) => item._id !== inventoryId)
            );

            toast.success("Inventory item deleted successfully!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });

            navigate("/InventoryDetailsDisplay");
          }
        })
        .catch((error) => {
          console.error("Error deleting inventory:", error);
          toast.error("Failed to delete inventory item", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    const columns = [
      "Product Name",
      "Available Quantity",
      "Average Unit Price",
      "Order Level",
    ];
    const rows = filteredInventory.map((item) => [
      item.name,
      item.quantity,
      item.avgunitprice,
      item.quantity < 10
        ? "Preorder level"
        : item.quantity < 20
        ? "Low"
        : "Normal",
    ]);
    doc.text("Inventory Report", 10, 10);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save("inventory_report.pdf");

    toast.success("Inventory Report downloaded successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory/getAllInventory")
      .then((response) => {
        setInventory(response.data);
        setFilteredInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventory]);

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="container mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-blue-600">Inventory</h2>
          <div>
            <div className="flex space-x-2">
              <button
                className="btn bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={downloadReport}
              >
                Download Report
              </button>
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={() => navigate("/CreateInventory")}
              >
                New +
              </button>
              <button
                className="btn bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={() => {
                  // Add your order functionality here
                }}
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Inventory"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th className="text-left">Available Quantity</th>
              <th className="text-left">Average Unit Price</th>
              <th className="text-left">Order Level</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.avgunitprice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`${
                      item.quantity < 10
                        ? "bg-red-300 text-red-700"
                        : item.quantity < 20
                        ? "bg-yellow-300 text-yellow-700"
                        : "bg-green-300 text-green-700"
                    } py-1 px-2 rounded`}
                  >
                    {item.quantity < 10
                      ? "Preorder level"
                      : item.quantity < 20
                      ? "Low"
                      : "Normal"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="text-blue-600 hover:text-blue-700 mr-2"
          onClick={() => updateInventory(item._id)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:text-red-700"
          onClick={() => deleteInventory(item._id)}
        >
          Delete
        </button>
      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
