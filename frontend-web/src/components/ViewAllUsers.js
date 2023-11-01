import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default function ViewAllUsers() {


    const navigate = useNavigate();


    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of courses from your server when the component mounts
        async function getUsers() {
            try {
                const response = await axios.post('http://localhost:8080/auth/getAllUsers'); // Adjust the endpoint based on your API route
                setUsers(response.data);


            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        getUsers();
    }, []);


    const [filter, setFilter] = useState("");
    const [filterRole, setfilterRole] = useState("");

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    function filterRoleOp(e) {
        setfilterRole(e.target.value);
    }

    const filteredReports = users.filter((rep) => {
        return rep.firstname.toLowerCase().includes(filter.toLowerCase()) & rep.role.toLowerCase().includes(filterRole.toLowerCase());
    })


    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPdf(orientation, unit, size);

        // Assuming you have an image for the logo
        // const imageData = logo;

        doc.setFontSize(15);

        const title = "Doctor Appointments Table";

        const headers = [
            ["First Name", "Last Name", "Age", "Email", "DOB", "Role"]
        ];

        const data = filteredReports.map((user) => [
            user.firstname,
            user.lastname,
            user.age,
            user.email,
            user.dob,
            user.role
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        // Uncomment this if you have an image for the logo
        // doc.addImage(imageData, "JPEG", 10, 10, 50, 50);

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("UserDetails.pdf");
        //toast("Doctor Appointments Report Download");
    }


    async function deleteUser(userId) {

        try {

            const response = await axios.post("http://localhost:8080/auth/deleteUser", { userId });
            alert("Success Delete User")
            window.location.reload();

        } catch (error) {
            alert('Delete unsuccessful' + error);
            console.log(error);
        }

    }




    return (

        <div class="container mx-auto p-8">
            <div class="bg-blue-500 p-8 rounded-lg">
                <h1 class="text-4xl text-white mb-4">Doctor Appointments</h1>
                <div class="flex flex-wrap justify-between space-y-4 md:space-y-0">
                    <div class="w-full md:w-1/4">
                        <div class="form-group">
                            <label for="roleFilter" class="text-white">Role Filter</label>
                            <select class="form-control" id="roleFilter" onChange={filterRoleOp}>
                                <option value="">All</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <div class="form-group">
                            <label for="search" class="text-white">Search Name</label>
                            <input type="text" class="form-control search" placeholder="Search by NIC" onChange={handleFilterChange} />
                        </div>
                    </div>
                    <div class="w-full md:w-1/4">
                        <button type="button" class="btn btn-primary mt-2" onClick={() => { generatePdf() }}>Download All Details</button>
                    </div>
                    <div class="w-full md:w-1/4">
                        <button type="button" class="btn btn-primary mt-2" onClick={() => { navigate(`/adminRegister`) }}>Add New User</button>
                    </div>
                </div>
            </div>
            <div class="overflow-x-scroll mt-4">
                <table class="table table-striped table-hover" id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Role</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td>{user.role}</td>
                                <td class="space-x-2">
                                    <a href={'/updateUsers/' + user._id}><button class="btn btn-sm text-white bg-blue-500">Update</button></a>
                                    <a onClick={() => deleteUser(user._id)}><button class="btn btn-sm text-white bg-red-500">Delete</button></a>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>




    )



}