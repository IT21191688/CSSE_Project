import axios from 'axios';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useParams, useNavigate } from 'react-router-dom';

const InvoicePayment = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [amount, setAmount] = useState('');
    const [cardno, setCardNumber] = useState('');
    const [date, setExpirationDate] = useState('');
    const [payersName, setPayersName] = useState('');
    const [email, setEmail] = useState(''); // Fix the state name
    const [contactNo, setContactNo] = useState(''); // Fix the state name
    const { invoiceId } = useParams();
    const navigate = useNavigate();
    const orderid = invoiceId;

    const paymentstatus = 'Completed';

    // Add a new state to store the confirmed data
    const [confirmedData, setConfirmedData] = useState(null);

    const [amountError, setAmountError] = useState('');
    const [cardNoError, setCardNoError] = useState('');
    const [dateError, setDateError] = useState('');
    const [contactNoError, setContactNoError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeStep === 3) {

            try {
                // Validate input data here (e.g., card number and date)

                // Create an object to send in the POST request
                const paymentDetails = { orderid, amount, cardno, date, paymentstatus };

                // Send a POST request to your server to save the payment details
                await axios.post('http://localhost:8080/payment/createPayment', paymentDetails);

                // Optionally, you can reset the form or perform other actions on success
                setAmount('');
                setCardNumber('');
                setExpirationDate('');
                alert('Payment submitted successfully!');
                navigate('/paymentDetails');

            } catch (error) {
                if (error.response) {
                    // Handle specific error responses from the server
                    // Display a more detailed error message to the user
                    alert('Error submitting payment: ' + error.response.data.message);
                } else {
                    alert('Error submitting payment: ' + error.message);
                }
            }

        }
        else {
            // Otherwise, move to the next step
            handleNext();
        }
    }

    const handleNext = () => {
        if (validateStepData()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const validateStepData = () => {
        if (activeStep === 0) {
            if (isNaN(amount) || parseFloat(amount) <= 0) {
                setAmountError('Invalid amount. Please enter a positive number.');
                return false;
            } else {
                setAmountError('');
            }
        } else if (activeStep === 1) {
            // Validate payer's information
            if (!payersName) {
                // Add your validation logic for payer's name
            }

            if (!/^\d{10}$/.test(contactNo)) {
                setContactNoError('Invalid contact number. Please enter a 10-digit number.');
                return false
            } else {
                setContactNoError('');
            }

        } else if (activeStep === 2) {
            if (!/^\d{16}$/.test(cardno)) {
                setCardNoError('Invalid card number. Please enter a 16-digit number.');
                return false;
            } else {
                setCardNoError('');
            }
            if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(date)) {
                setDateError('Invalid expiration date. Please enter a valid MM/YYYY date.');
                return false;
            } else {
                setDateError('');
            }
        }
        return true;
    };


    // Define the form data as an object
    const [formData, setFormData] = useState({
        payersName: "",
        contactNo: "",
        email: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const steps = [
        "Payment Information",
        "Payer's Information",
        "Card Details", // Exchange "Payment Confirmation" with "Card Details"
        "Payment Confirmation", // Exchange "Card Details" with "Payment Confirmation"
    ];

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div className="w-auto p-5 bg-white rounded shadow-lg">

                        <TextField
                            label="OrderId"
                            name="OrderId"
                            value={orderid}
                            disabled
                            className="mx-5 w-80"
                        />
                        <TextField
                            label="Amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mx-4 w-80"
                            error={!!amountError}
                            helperText={amountError}
                            required
                            type='number'
                        />

                    </div>
                );
            case 1:
                return (
                    <div className="w-auto p-5 bg-white rounded shadow-lg">
                        <TextField
                            label="Payer's Name"
                            name="payersName"
                            value={payersName}
                            onChange={(e) => setPayersName(e.target.value)}
                            className="mx-5 w-80"
                        />
                        <TextField
                            label="Contact No"
                            name="contactNo"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            className="mx-4 w-80"
                            error={!!contactNoError}
                            helperText={contactNoError}
                            type='number'
                        />
                    </div>

                );
            case 2: // Was "Payment Confirmation" and is now "Card Details"
                return (
                    <div className="w-auto p-5 bg-white rounded shadow-lg">
                        <TextField
                            label="Card Number"
                            name="cardNumber"
                            value={cardno}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="mx-5 w-80"
                            error={!!cardNoError}
                            helperText={cardNoError}
                            type='number'
                        />
                        <TextField
                            label="Expiration Date"
                            name="expirationDate"
                            value={date}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            className="mx-4 w-80"
                            error={!!dateError}
                            helperText={dateError}
                        />
                    </div>
                );
            case 3: // Was "Card Details" and is now "Payment Confirmation"
                return (
                    <div>
                        {/* Display the confirmed data */}
                        <div className="bg-gray-100 p-4 rounded border border-gray-300 mt-4">
                            <h1 className="font-semibold text-lg">Confirmed Payment Details:</h1>
                            <p><strong>Order ID:</strong> {orderid}</p>
                            <p><strong>Amount:</strong> {amount}</p>
                            <p><strong>Payer's Name:</strong> {payersName}</p>
                            <p><strong>Contact No:</strong> {contactNo}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Card Number:</strong> {cardno}</p>
                            <p><strong>Expiration Date:</strong> {date}</p>
                        </div>
                    </div>

                );
            default:
                return "Unknown step";
        }
    };

    return (
        <div className="container w-3/4 mt-20">
            <h1>Payment Gateway</h1>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <h2>Payment Submitted</h2>

                    </div>
                ) : (
                    <div className="mt-20 flex flex-col items-center justify-center">
                        <div className="w-3/4 mt-0 bg-white p-6 rounded shadow-lg justify-center ">
                            {getStepContent(activeStep)}
                            <div className="flex justify-center mt-6 space-x-4">
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="contained"
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                                </Button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default InvoicePayment;
