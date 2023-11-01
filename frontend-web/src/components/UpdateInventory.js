import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateInventory() {
  const navigate = useNavigate();
  const { inventoryId } = useParams();

  const [inventory, setInventory] = useState({});
  const [updatedInventory, setUpdatedInventory] = useState({
    name: "",
    quantity: "",
    avgunitprice: "",
  });

  useEffect(() => {
    // Fetch the selected inventory's details
    axios
      .get(`http://localhost:8080/inventory/getOneInventory/${inventoryId}`)
      .then((response) => {
        setInventory(response.data);
        // Initialize the updatedInventory state with the current inventory data
        setUpdatedInventory({
          name: response.data.name,
          quantity: response.data.quantity,
          avgunitprice: response.data.avgunitprice,
        });
      })
      .catch((error) => {
        console.error("Error fetching inventory details:", error);
      });
  }, [inventoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the input name and value
    // Update the updatedInventory state based on user input
    setUpdatedInventory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send a PUT request to update the inventory
    axios
      .put(
        `http://localhost:8080/inventory/updateInventory/${inventoryId}`,
        updatedInventory
      )
      .then(() => {
        // Redirect to the inventory details page or perform any other action
        alert("Updated Successfully");
        navigate(`/InventoryDetailsDisplay`); // You can adjust the redirection URL as needed
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-themeBlue mb-4">
          Update Inventory
        </h2>
        <form className="update-form">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-themeBlue text-lg font-semibold mb-2"
            >
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              value={updatedInventory.name}
              onChange={handleInputChange}
              className="form-input w-full p-2 border border-themeLightGray rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-themeBlue text-lg font-semibold mb-2"
            >
              Quantity:
            </label>
            <input
              type="text"
              name="quantity"
              value={updatedInventory.quantity}
              onChange={handleInputChange}
              className="form-input w-full p-2 border border-themeLightGray rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-themeBlue text-lg font-semibold mb-2"
            >
              Average Unit Price:
            </label>
            <input
              type="text"
              name="avgunitprice"
              value={updatedInventory.avgunitprice}
              onChange={handleInputChange}
              className="form-input w-full p-2 border border-themeLightGray rounded-md"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4B0082", // Purple background color
                color: "white", // White text color
                padding: "12px 24px", // Padding
                borderRadius: "8px", // Rounded corners
                fontSize: "16px", // Font size
                cursor: "pointer", // Cursor style
                transition: "background-color 0.3s", // Smooth transition on hover
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
