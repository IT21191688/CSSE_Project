import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function FogotPassword() {


    const navigate = useNavigate();

    const [email, setUserName] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [enteredvalue, setEnteredvalue] = useState('')

    const keySubmit = async (e) => {
        e.preventDefault();
        try {


            if (enteredvalue === verificationCode) {

                alert(enteredvalue + verificationCode)
                navigate('/changePassword/' + email);

            } else {

                alert("Your Varification code not valid Please try Again")
                navigate('/login');

            }


        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const sendVerificationCode = async (e) => {
        e.preventDefault();

        try {

            const key = generateVerificationCode();

            const response = await axios.post('http://localhost:8080/auth/sendVerificationCode', { email, key });

            const verificationCode = response.data.Digits;
            alert("Verification code sent: " + verificationCode);

            setVerificationCode(verificationCode);


        } catch (error) {

            alert("Something went wrong" + error)
            console.log(error);
        }
    };

    const cancel = () => {


        navigate('/login')

    }

    const generateVerificationCode = () => {
        const codeLength = 6; // Length of the verification code
        return nanoid(codeLength);
    };


    return (

        <div className="container flex justify-center items-center min-h-screen">
            <div className="pb-10">
                <form className="mt-0 border rounded-lg shadow-xl p-5 w-96">
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">Change Password</h1>

                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                            User Name
                        </label>
                        <input
                            type="email"
                            id="userName"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Enter Your Email"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            type="button"
                            className="btn-primary w-full py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring focus:outline-none focus:ring-green-300 dark:focus:ring-green-800"
                            onClick={sendVerificationCode}
                        >
                            Send Verification Code
                        </button>

                    </div>

                    <div className="mb-4">
                        <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="verificationCode"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Enter Verification Code"
                            onChange={(e) => setEnteredvalue(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            type="button"
                            className="btn-primary w-full py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            onClick={keySubmit}
                        >
                            Submit
                        </button>
                    </div>

                    <button
                        type="button"
                        className="btn-secondary w-full py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>

    )



}