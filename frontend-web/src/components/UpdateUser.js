import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdateUser() {

    const { userId } = useParams();

    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');


    useEffect(() => {

        const fetchProfileDetails = async () => {

            try {

                const response = await axios.post("http://localhost:8080/auth/profile", { userId });


                setFirstName(response.data.firstname)
                setLastName(response.data.lastname)
                setAge(response.data.age)
                setEmail(response.data.email)
                setDob(response.data.dob)
                setRole(response.data.role)

                //window.location.reload(true);
            } catch (error) {
                alert('Data Load Unsuccessfull' + error);
                console.log(error);
            }
        };
        fetchProfileDetails();
        alert(firstname);

    }, [])




    const handleSubmit = async () => {

        try {

            const response = await axios.put("http://localhost:8080/auth/updateUser", { userId, firstname, lastname, age, dob });

            alert("Update success")
            //window.location.reload(true);
        } catch (error) {
            alert('Update unsuccessful' + error);
            console.log(error);
        }

    }

    const cancel = () => {
        navigate(`/getUsers`);

    }


    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Update User Details</h1>
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
                                value={firstname}
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
                                value={lastname}
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
                            value={email}
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
                            value={age}
                            onChange={(e) => setAge(e.target.value)}

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
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}

                        />
                    </div>
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <input
                            type="text"
                            id="role"
                            className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md py-2 px-3 focus:ring focus:ring-opacity-50 focus:ring-blue-400 hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                    <div>
                        <button

                            onClick={cancel}
                            type="button"
                            className="w-full bg-blue-500 text-white rounded-md py-2 px-3 focus:ring focus:ring-opacity-50 focus:ring-blue-400 hover:bg-blue-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>



    )



}