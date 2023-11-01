import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {


    const [email, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')


    const resetSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend API
            const response = await axios.post('http://localhost:8080/auth/resetPassword', { email, password, oldPassword });


            alert(response)

            if (response.data.pass == true) {

                alert("Password Changed Plese Loging again")
                window.location.reload('/login');
            } else {

                alert("Password Not Changed Please Try again")
                window.location.reload('/resetPassword');

            }


        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const cancel = () => {

        window.location.reload('/profile')

    }



    return (

        <div className='container flex justify-center' >
            <form className='mt-20 border border-gray-300 rounded-lg shadow-lg p-6 w-80'>
                <h1 className='text-2xl font-bold text-center text-primary mb-6'>Change Password</h1>

                <div className='mb-4'>
                    <label htmlFor='userName' className='block text-sm font-medium text-gray-700'>
                        User Name
                    </label>
                    <input
                        type='email'
                        className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:border-primary focus:outline-none'
                        placeholder='Enter your email'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='oldPassword' className='block text-sm font-medium text-gray-700'>
                        Old Password
                    </label>
                    <input
                        type='password'
                        className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:border-primary focus:outline-none'
                        placeholder='Enter your old password'
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700'>
                        New Password
                    </label>
                    <input
                        type='password'
                        className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:border-primary focus:outline-none'
                        placeholder='Enter your new password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='flex justify-between items-center'>
                    <button
                        type='submit'
                        className='bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-md py-2 px-4 w-48'
                        onClick={resetSubmit}
                    >
                        Submit
                    </button>

                    <div className='w-4'></div> {/* Add a small space */}

                    <a href='/profile' className='bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 px-4 w-48 text-center' onClick={cancel}>
                        Cancel
                    </a>
                </div>

            </form>
        </div>
    )



}