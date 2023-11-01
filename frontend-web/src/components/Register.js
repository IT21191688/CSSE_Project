import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {


    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const role = 'user'


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/auth/register', {
                firstname,
                lastname,
                email,
                age,
                dob,
                password,
                role,
            });

            alert("User add success")
            navigate('/login')
        } catch (error) {
            alert(error)
            console.log(error);
        }
    };


    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Age"
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md py-2 px-3 focus:ring focus:ring-opacity-50 focus:ring-blue-400 hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="text-center">
                        <span>Already have an account?</span>
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>



    )



}