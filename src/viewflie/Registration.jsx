import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadingImage from '../node/uploads/Animation - 1720176291108.gif'; 

function RegistrationComponent() {
    const [theme, setTheme] = useState('dark'); 
    const [data, setData] = useState({
        Name: '',
        Email: '',
        Password: '',
        PasswordC: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const AllData = (event) => {
        const { name, value } = event.target;
        setData((oldData) => ({
            ...oldData,
            [name]: value
        }));
    };

    const Submit = async (e) => {
        e.preventDefault();
        const { Name, Email, Password, PasswordC } = data; 
        setLoading(true); 
        try {
            const response = await Axios.post('https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/Registration', {
                Name,
                Email,
                Password,
                PasswordC
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const apiData = response.data; 
            if(apiData) {    
                navigate('/Login'); 
            } else {
                window.alert(apiData.error);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
            window.alert(error.response.data.error);
        }
        
        setLoading(false); 
        setData({
            Name: '',
            Email: '',
            Password: '',
            PasswordC: ''
        });
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <section className={`h-105 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="container py-5 h-105">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8">
                        <div className={`card border-0 rounded-3 shadow-lg ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            <div className="card-body p-4">
                                <h3 className="mb-4 text-center">{theme === 'dark' ? 'Create an Account (Dark Theme)' : 'Create an Account (Light Theme)'}</h3>
                                <form onSubmit={Submit} method="post">
                                    <div className="mb-3">
                                        <label htmlFor="Name" className="form-label">User Name</label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${theme === 'dark' ? 'bg-secondary text-light border-light' : 'bg-light text-dark border-dark'}`}
                                            id="Name"
                                            name="Name"
                                            placeholder="Enter your username"
                                            required
                                            value={data.Name}
                                            onChange={AllData}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Email" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className={`form-control form-control-lg ${theme === 'dark' ? 'bg-secondary text-light border-light' : 'bg-light text-dark border-dark'}`}
                                            id="Email"
                                            name="Email"
                                            placeholder="Enter your email"
                                            required
                                            value={data.Email}
                                            onChange={AllData}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className={`form-control form-control-lg ${theme === 'dark' ? 'bg-secondary text-light border-light' : 'bg-light text-dark border-dark'}`}
                                            id="Password"
                                            name="Password"
                                            placeholder="Create a password"
                                            required
                                            value={data.Password}
                                            onChange={AllData}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="PasswordC" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className={`form-control form-control-lg ${theme === 'dark' ? 'bg-secondary text-light border-light' : 'bg-light text-dark border-dark'}`}
                                            id="PasswordC"
                                            name="PasswordC"
                                            placeholder="Confirm your password"
                                            required
                                            value={data.PasswordC}
                                            onChange={AllData}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {loading ? (
                                            <div className='d-flex justify-content-center'>
                                                <img src={loadingImage} alt="Loading..." className="img-fluid" />
                                            </div>
                                        ) : (
                                            <button type="submit" className={`btn btn-lg px-4 py-2 ${theme === 'dark' ? 'btn-primary' : 'btn-dark'}`}>Sign Up</button>
                                        )}
                                    </div>
                                </form>
                                <button className="btn btn-sm btn-outline-secondary mt-3" onClick={toggleTheme}>
                                    Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Theme
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegistrationComponent;
