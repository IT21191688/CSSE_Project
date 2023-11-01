import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminSideRegister() {


    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')


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

    useEffect(() => {

        setRole('admin')


    }, []);


    return (

        <div className='container flex justify-center' style={{ height: "90vh" }} >

            <form className='mt-20 border-solid border-inherit border-2 rounded-sm p-5 shadow-xl' method="post" encType="multipart/form-data" >
                <h1 className='text-primary text-2xl font-bold'>Register Form</h1>

                <div className='row'>
                    <div class="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" class="form-control" placeholder="First Name" onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div class="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" class="form-control" placeholder="Last Name" onChange={e => setLastName(e.target.value)} required />
                    </div>
                </div><br></br>
                <div className='row'>
                    <div class="form-group col-md-6">
                        <label >Email</label>
                        <input type="email" class="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div class="form-group col-md-6">
                        <label >Age</label>
                        <input type="number" class="form-control" placeholder="Age" onChange={e => setAge(e.target.value)} required />
                    </div>
                </div><br></br>
                <div className='row'>
                    <div class="form-group col-md-6">
                        <label >Date Of Birth</label>
                        <input type="date" class="form-control" onChange={e => setDob(e.target.value)} required />
                    </div>
                    <div class="form-group col-md-6">
                        <label ><b>Password</b></label>
                        <input type="password" class="form-control" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                </div><br></br>
                <div className='row'>
                    <div class="form-group col-md-12">
                        <div className="form-group col-md-12 mt-3 mt-md-0">
                            <label for="name"><b>Job Role</b></label>
                            <select name="role" className="form-control" onChange={e => setRole(e.target.value)} required>
                                <option value={'admin'}>Admin</option>
                                <option value={'user'}>User</option>
                            </select>
                        </div >
                    </div>
                </div><br></br>


                <button type="submit" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" onClick={handleSubmit}>Submit</button><br></br><br></br>
                <Link to={'/login'}><button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-48" >Cancel</button></Link>
            </form>




        </div>
    )



}