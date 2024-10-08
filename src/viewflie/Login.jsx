import React, { useState } from "react";
import Axios from 'axios';
import "./Cssfail/Login.css";
import image from "../node/uploads/pngwing.com.png";
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "./Header";

const Login = () => {
    const [data, setData] = useState({
        Name: '',
        Password: ''
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((oldData) => ({
            ...oldData,
            [name]: value
        }));
    };

    const button = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { Name, Password } = data;
        try {
            const response = await Axios.post('http://localhost:4000/Login_Data', {
                Name,
                Password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const apiData = response.data;

            if(apiData.isAdmin) {
                navigate('/adProduct');
            } else if (apiData.token) {
                const id = apiData.id;
                localStorage.setItem("userId", id);
                localStorage.setItem('token', apiData.token);
                localStorage.setItem("user_Name", apiData.name);            
                navigate(`/Project/${id}`);
                console.log(apiData.token);
            } else {
                // Error
                localStorage.setItem("userId", "");
                window.alert(apiData.error);
            }
        } catch (error) {
            console.log('Error fetching data:', error?.response?.data?.error);
            window.alert(error?.response?.data?.error);
        }

        setLoading(false);
        setData({
            Name: "",
            Password: ""
        });
    };

    return (
        <>
            <Header />
            <section className="vh-109" style={{ paddingTop: "5rem" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-91">
                        <div className="col col-xl-12">
                            <div className="card animated-card" style={{ backgroundColor: "#dcf5ed", height: "34.5rem" }}>
                                <div className="row g-1 h-100">
                                    <div className="col-md-5 col-lg-5 d-none d-md-block">
                                        <img
                                            src={image}
                                            alt="login form"
                                            className="img-fluid"
                                            style={{
                                                borderRadius: "1rem 0 0 1rem",
                                                objectFit: "cover",
                                                height: "90.5%",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black d-flex flex-column justify-content-center">
                                            <form method="post" onSubmit={button}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h1 fw-bold mb-0">Logo</span>
                                                </div>
    
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
    
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example17">User Name</label>
                                                    <input
                                                        onChange={handleChange}
                                                        type="text"
                                                        id="form2Example17"
                                                        name="Name"
                                                        value={data.Name}
                                                        required
                                                        className="form-control form-control-lg"
                                                        placeholder="User-Name"
                                                    />
                                                </div>
    
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                    <input
                                                        onChange={handleChange}
                                                        type="password"
                                                        id="form2Example27"
                                                        name="Password"
                                                        value={data.Password}
                                                        required
                                                        className="form-control form-control-lg"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="pt-1 mb-2">
                                                    {loading ? (
                                                        <div className="d-flex justify-content-center">
                                                            <div className="spinner-border custom-spinner" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">
                                                            Login
                                                        </button>
                                                    )}
                                                </div>
    
                                                <NavLink to="/Email" className="small text-muted" type="button">Forgot password?</NavLink>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <NavLink to="/Registration" style={{ color: "#393f81" }}>Register here</NavLink></p>
                                            </form>
    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
