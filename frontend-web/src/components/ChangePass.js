import React from 'react'
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ChangePass() {

    const { email } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const resetSubmit = async (e) => {
        e.preventDefault();

        try {

            if (password === newPassword) {
                const response = await axios.post('http://localhost:8080/auth/changePassword', { email, password });



                if (response.data.changed == true) {

                    alert("Password Changed Plese Loging again")
                    navigate('/login');
                } else {

                    alert("Password Not Changed Please Try again")
                    navigate('/fogotPassword');

                }

            }

        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const cancel = () => {

        navigate('/login');


    }


    return (
        <div className='container flex justify-center' style={{ height: "90vh" }}>
            <div className='pb-5'>
                <form className='mt-5 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl w-100' method="post" encType="multipart/form-data">
                    <h1 className='text-primary text-2xl font-bold'>Change Password</h1>
                    <br />
                    <div className='row'>
                        <div className="form-group col-md-12">
                            <label>User Name</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email} disabled />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-12">
                            <label>New Password</label>
                            <input type="password" className="form-control" placeholder="Enter new password" onChange={e => setNewPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-md-12">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Confirm new password" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <button type="submit" className="btn-secondary w-full py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={resetSubmit}>
                        Submit
                    </button>

                    <button type="submit" className="btn-secondary w-full py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring focus:outline-none focus:ring-red-300 dark:focus:ring-red-800" onClick={cancel}>
                        Cancel
                    </button>

                </form>
            </div>
        </div>

    )



}