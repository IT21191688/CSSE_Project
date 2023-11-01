import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [jwtToken, setJwtToken] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Send login request to the backend API
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            const token = response.data.token;
            const role = response.data.role

            // Store the token in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            alert("Login success" + role)

            window.location.reload(true);


        } catch (error) {

            alert("Login Unsuccess")
            console.log(error);

        }
    };


    const googleAuth = async () => {

        try {

            const popup = window.open("http://localhost:8080/auth/google", "_blank", "width=600,height=600");


            const receiveMessage = (event) => {
                if (event.origin === "http://localhost:8080" && event.data.token && event.data.role) {
                    const { token, role } = event.data;


                    // Store the token in local storage
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);



                    // Close the popup
                    popup.close();
                    window.removeEventListener("message", receiveMessage);

                    window.location.reload(true);
                }
            };



            // Add event listener to receive messages from the popup
            window.addEventListener("message", receiveMessage);

        } catch (error) {

            alert("Login Unsucess")
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('role') === 'admin') {
            navigate('/managerHome');

        } else if (localStorage.getItem('role') === 'user') {
            navigate('/userHome');
        }
        else {
            navigate('/login')
        }
    }, []);


    return (

        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <h1 className='text-3xl font-bold text-center text-primary mb-6'>Login</h1>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-primary'
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Password</label>
                        <input
                            type="password"
                            className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-primary'
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 focus:ring-4 focus:ring-green-300 text-white rounded-md py-2 px-4 w-1/2"
                        >
                            Login
                        </button>

                        <Link
                            to="/register"
                            className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 text-white rounded-md py-2 px-4 w-1/2 ml-2 text-center">
                            Register
                        </Link>

                    </div>



                    <div className='mt-4 text-center'>
                        <button
                            type='button'
                            className='bg-white border border-gray-300 rounded-md flex items-center justify-center p-2 w-48 mx-auto hover:border-gray-400 hover:shadow transition duration-150'
                            onClick={googleAuth}
                        >
                            <img className='w-6 h-6 mr-2' src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" />
                            Google Login
                        </button>
                    </div>

                    <div className='text-center'>
                        <span className='text-gray-600'>
                            Forgot Password? <Link to='/fogotPassword' className='text-blue-500 hover:underline'>Reset</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>

    )

}