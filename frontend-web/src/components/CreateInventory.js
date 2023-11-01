import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateInventory() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [avgunitprice, setAvgUnitPrice] = useState("");
  const [nameError, setNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [avgunitpriceError, setAvgUnitPriceError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAvgUnitPriceChange = (e) => {
    setAvgUnitPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    if (name.trim() === "") {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (quantity.trim() === "") {
      setQuantityError("Quantity is required.");
      isValid = false;
    } else if (isNaN(quantity) || parseFloat(quantity) <= 0) {
      setQuantityError("Quantity must be a positive number.");
      isValid = false;
    } else {
      setQuantityError("");
    }

    if (avgunitprice.trim() === "") {
      setAvgUnitPriceError("Average unit price is required.");
      isValid = false;
    } else if (isNaN(avgunitprice) || parseFloat(avgunitprice) <= 0) {
      setAvgUnitPriceError("Average unit price must be a positive number.");
      isValid = false;
    } else {
      setAvgUnitPriceError("");
    }

    if (!isValid) {
      return; // Do not submit the form if there are validation errors.
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/inventory/createInventory",
        {
          name,
          quantity,
          avgunitprice,
        }
      );

      console.log("Inventory Item created:", response.data);

      // Clear the form fields after successful submission
      setName("");
      setQuantity("");
      setAvgUnitPrice("");

      alert("Inventory created successfully");
      navigate(`/InventoryDetailsDisplay`); // Redirect to the desired page after submission
    } catch (error) {
      console.error("Error creating inventory:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-themeBlue mb-4">
          Create New Inventory
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-themeBlue text-lg font-semibold mb-2"
            >
              Item Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                nameError ? "border-red-500" : ""
              }`}
            />
            {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-themeBlue text-lg font-semibold mb-2"
            >
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                quantityError ? "border-red-500" : ""
              }`}
            />
            {quantityError && (
              <p className="text-red-500 mt-2">{quantityError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="avgunitprice"
              className="block text-themeBlue text-lg font-semibold mb-2"
            >
              Average Unit Price:
            </label>
            <input
              type="text"
              id="avgunitprice"
              value={avgunitprice}
              onChange={handleAvgUnitPriceChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                avgunitpriceError ? "border-red-500" : ""
              }`}
            />
            {avgunitpriceError && (
              <p className="text-red-500 mt-2">{avgunitpriceError}</p>
            )}
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#4B0082", // Purple
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Create Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
