import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import '../adminpanel/Header.css';
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
                    <img src={image_url} className="image_url" alt="Logo" onClick={() => path("/adProduct")} />
                </div>
                <div className="logo">
                    <ul className="menu-list">
                            <>
                                <li>
                                    <div style={{ display: 'flex', gap: '5.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <NavLink to={`/adProduct`}>Home</NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <NavLink to={`/Product-List`}>Product-List</NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <NavLink to={`/Report`}>Report</NavLink>
                                    </div>
                                </li>
                            </>
                    </ul>
                </div>
            </section>
        </header>
    );
};

export default Header;