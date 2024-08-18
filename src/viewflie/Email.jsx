import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Cssfail/Email.css';
import loadingImage from '../node/uploads/Animation - 1720178142274 (1).gif'; 

const Email = () => {
    const [Data, SetData] = useState({ Email: '' });
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const data = (event) => {
        const { name, value } = event.target;
        SetData((oldData) => ({
            ...oldData,
            [name]: value
        }));
    };

    const Submit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        const { Email } = Data;
        try {
            const response = await Axios.post('http://localhost:4000/OTP', {
                Email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const apiData = response.data;
            console.log(apiData);
            if (apiData) {
                navigate('/OTP');
            } else {
                window.alert(apiData.error);
            }
        } catch (error) {
            console.log('Error fetching data:', error.response.data.error);
            window.alert(error.response.data.error);
        }

        setLoading(false); 
        SetData({
            Email: ''
        });
    };

    return (
        <>
            <form onSubmit={Submit} method="post" className='Email_form'>
                <h3 className='Email_h3'>Enter The mail id please </h3>
                <div className="Email_main">
                    <i className="fa-solid fa-envelope"></i>
                    <input className='Email_input' type="email" name="Email" value={Data.Email} required placeholder="Email" onChange={data} />
                </div>
                <br />
                {loading ? (
                    <div className='Email_main_image'>
                        <img src={loadingImage} alt="Loading..." />
                    </div>
                ) : (
                    <button id="fun1" type="submit" className='Email_button'>Submit</button>
                )}
            </form>
        </>
    );
}

export default Email;
