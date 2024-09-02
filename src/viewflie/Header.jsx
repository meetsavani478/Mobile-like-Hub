import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import './Cssfail/Home.css';
import { useNavigate } from 'react-router-dom';
import image_url from "../node/uploads/Mesa_de_trabajo_1-100-removebg-preview.png";
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [Name, setName] = useState('');
    const path = useNavigate();
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setName(localStorage.getItem('user_Name'));
    }, [id, token]);

    const toggleMenu = () => {
        const menuList = document.querySelector('.menu-list');
        if (menuList) {
            menuList.classList.toggle('show');
        }
    };

    return (
        <header>
            <section className="title-1">
                <div className="logo-1">
                    <img src={image_url} className="image_url" alt="Logo" onClick={() => path("/")} />
                    &nbsp;
                    {isLoggedIn && (
                        <p id="welcome" className="welcome-message text-white mb-0">
                            Welcome, <span className="user-name text-warning">{Name}</span>
                        </p>
                    )}
                </div>
                <div className="logo">
                    <div className="burger-menu" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <ul className="menu-list">
                        {!isLoggedIn && (
                            <li className="li-1">
                                <NavLink to="/Login">Login</NavLink>
                            </li>
                        )}
                        {isLoggedIn && (
                            <>
                                <li>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <i className="fa-solid fa-house-chimney" style={{ color: "white", fontSize: "1.3rem" }}></i>
                                        <NavLink to={`/Project/${id}`}>Home</NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <i className="fa-solid fa-dollar-sign" style={{ color: "white", fontSize: "1.3rem" }}></i>
                                        <NavLink to={`/About`}>About</NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <i className="fa-solid fa-user" style={{ color: "white", fontSize: "1.3rem" }}></i>
                                        <NavLink to={`/User`}>User</NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <i className="fa-solid fa-envelope" style={{ color: "white", fontSize: "1.3rem" }}></i>
                                        <NavLink to={`/Update_profile`}>Update User_Id</NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <NavLink to={`/Addcart`}><i class="fa-solid fa-cart-shopping" style={{ color: "white", fontSize: "1.3rem" }}></i></NavLink>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </section>
        </header>
    );
};

export default Header;
