import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// Import the additional FontAwesome icons here
import {
    faHome,
    faCode,
    faFileCode,
    faSignInAlt,
    faUserPlus,
    faBook,
    faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';


export default function NavBarUser() {
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenC, setIsDropdownOpenC] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const toggleDropdownC = () => {
        setIsDropdownOpenC(!isDropdownOpen);
    };

    const closeDropdownC = () => {
        setIsDropdownOpenC(false);
    };

    const logOut = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    useEffect(() => {
        const data = localStorage.getItem("user");
        setUser(JSON.parse(data));
        setRole(localStorage.getItem("role"));
    }, []);

    return (
        <nav className="bg-blue-900 shadow-lg py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <a className="text-white text-3xl font-bold" href="#">
                        Procurement System
                    </a>
                    <div className="md:flex md:items-center space-x-4">
                        <ul className="flex space-x-4 text-white">
                            <li className="nav-item">
                                <a className="nav-link" href="/userHome">
                                    <FontAwesomeIcon /> Dashboard
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/managerHome">
                                    <FontAwesomeIcon /> Manager
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/supplierView">
                                    <FontAwesomeIcon /> Suppliers
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/products">
                                    <FontAwesomeIcon /> Products
                                </a>
                            </li>

                            <li
                                className="nav-item relative group"
                                onMouseEnter={toggleDropdown}
                                onMouseLeave={closeDropdown}
                            >
                                <button className="nav-link focus:outline-none">
                                    <FontAwesomeIcon icon={faUser} /> Profile
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`ml-1 fas fa-chevron-down ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                        } origin-top-right absolute right-0 mt-2 transition-transform transform-gpu duration-200 ease-in-out transform ${isDropdownOpen ? 'scale-y-100' : 'scale-y-0'
                                        }`}
                                >
                                    <ul className="bg-white text-black border border-gray-200 rounded-lg">
                                        <li>
                                            <a className="block px-4 py-2 hover:bg-gray-200" href={'/profile'}>
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a className="block px-4 py-2 hover-bg-gray-200" href={'/settings'}>
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <button className="block px-4 py-2 hover-bg-gray-200" onClick={() => logOut()}>
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    );
}

