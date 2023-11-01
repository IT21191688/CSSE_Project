import React from "react"
import axios from "axios";
import Styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react';
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";

export default function Profile() {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {

        const fetchProfileDetails = async () => {
            const token = localStorage.getItem('token')
            const decoded = jwt(token);
            const userId = decoded.userId;

            try {
                const response = await axios.post("http://localhost:8080/auth/profile", { userId });


                setFirstName(response.data.firstname)
                setLastName(response.data.lastname)
                setAge(response.data.age)
                setEmail(response.data.email)
                setDob(response.data.dob)
                setPassword(response.data.password)
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

    const deleteProfileDetails = async () => {

        const token = localStorage.getItem('token')
        const decoded = jwt(token);
        const userId = decoded.userId;

        try {

            const response = await axios.post("http://localhost:8080/auth/deleteUser", { userId });

            alert(response)

            localStorage.clear();
            window.location.href = '/login';

            //window.location.reload(true);
        } catch (error) {
            alert('Delete unsuccessful' + error);
            console.log(error);
        }
    };

    const updateProfileDetails = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const decoded = jwt(token);
        const userId = decoded.userId;

        try {

            const response = await axios.put("http://localhost:8080/auth/updateUser", { userId, firstname, lastname, age, dob });

            //window.location.reload(true);
        } catch (error) {
            alert('Update unsuccessful' + error);
            console.log(error);
        }
    };

    return (

        <div style={{ height: "90vh" }}>


            <div className="contsiner border border-secondary p-10 mr-64 ml-64 mt-10 rounded-md shadow-md">

                <div className="row">
                    <h1 className="text-2xl col text-right"><b>Hello</b></h1>
                    <h1 className="text-2xl col text-left text-rose-600"><b>{firstname + " " + lastname}</b></h1>

                </div><br></br>

                <div className="container">

                    <div className="row">

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                            <label for="firstNameInput">First Name</label>
                            <input type="text" class="form-control" value={firstname} id="firstNameInput" onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                            <label for="LastNameInput">Last Name</label>
                            <input type="text" class="form-control" value={lastname} id="LastNameInput" onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
                        </div>


                    </div>

                    <div className="row">

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="text" class="form-control" value={email} id="exampleInputEmail1" onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" readOnly />
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                            <label for="AgeInput">Age</label>
                            <input type="number" class="form-control" value={age} id="AgeInput" onChange={e => setAge(e.target.value)} placeholder="Enter Age" />
                        </div>


                    </div>

                    <div className="row">

                        <div class="form-group col-lg-6 col-md-6 col-sm-12">
                            <label for="DobInput">DOB</label>
                            <input type="date" class="form-control" value={dob} id="DobInput" onChange={e => setDob(e.target.value)} />
                        </div>

                        <div class="form-group col-lg-6 col-md-12 col-sm-12">
                            <label for="exampleInputEmail1">Role</label>
                            <input type="text" class="form-control" value={role} id="exampleInputEmail1" onChange={e => setRole(e.target.value)} placeholder="Role" readOnly />
                        </div>


                    </div>

                    <br></br>

                    <div className="row">

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <button className="btn float-right text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-50 " onClick={updateProfileDetails}>Update</button>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <button className="btn float-left text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-50 " onClick={deleteProfileDetails}>Delete</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}