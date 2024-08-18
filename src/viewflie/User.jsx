import React, { useEffect, useState } from 'react';
import './Cssfail/User.css';
import { NavLink, useNavigate } from 'react-router-dom';
import loadingImage from '../node/uploads/Animation - 1720506783494 (1).gif';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const User = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const imageBaseUrl = 'http://localhost:4000/';
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');

    const [data1, setData1] = useState({ profileImage: null });
    const [preview, setPreview] = useState(null); 

    const fetchData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.get(`http://localhost:4000/user/${id}`);
            const apiData = response.data;
            if (apiData) {
                setData(apiData);
                setLoading(false);
            } else {
                navigate('/Login');
                window.alert('Click on web login');
            }
        } catch (error) {
            navigate('/Login');
            setError(error);
            window.alert(`Click on web login ${error}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className='Loading_image'>
                <img src={loadingImage} alt="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className='Error_message'>
                <p>Error fetching user data. Please try again later.</p>
            </div>
        );
    }
 
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    const handleChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        setData1((oldData) => ({
            ...oldData,
            [name]: file
        }));

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { profileImage } = data1;

        const formData = new FormData();
        formData.append('profileImage', profileImage);

        try {
            const response = await axios.post(`http://localhost:4000/file_upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const apiData = response.data;
            if (apiData) {
                navigate(`/Project/${id}`);
            } else {
                navigate('/Login');
                window.alert(apiData.error);
            }
        } catch (error) {
            console.log('Error uploading image:', error?.response?.data?.error);
            navigate('/Login');
            window.alert(error?.response?.data?.error);
        }

        setData({
            profileImage: null,
        });
        setPreview(null);  
    };
    return (
        <div className='User_main'>
            <div className="User_m1">
                <NavLink to={'/project/'+id}><i className="fa-regular fa-circle-xmark"></i></NavLink>
                <NavLink to={'/Buy/'+1}><i className="fa-solid fa-pencil"></i></NavLink>
                <div className="User_M">
                    <div className="User_M_1" type="button" data-bs-toggle="modal" data-bs-target="#imageUploadModal">
                        <img src={imageBaseUrl + data.image} alt="User" />
                    </div>
                    <div className="User_M_1">
                        {/* <i className="fa-solid fa-id-card-clip"></i> */}
                        {/* <h3>{data.id}</h3> */}
                    </div>
                    <div className="User_M_1">
                        <i className="fa-regular fa-id-badge"></i>
                        <h3>{data.username}</h3>
                    </div>
                    <div className="User_M_1">
                        <i className="fa-solid fa-envelope-circle-check"></i>
                        <h3>{data.email}</h3>
                    </div>
                    <div className="User_M_1">
                        <i className="fa-solid fa-mobile"></i>
                        <h3>+91 {data.Number}</h3>
                    </div>
                    <div className="User_M_1">
                        <i className="fa-solid fa-location-dot"></i>
                        <h3>{data.address}</h3>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="imageUploadModal" tabIndex="-1" aria-labelledby="imageUploadModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imageUploadModalLabel">Upload Profile Photo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                            <div className="modal-body">
                                <div className="image_main_1 mb-3">
                                    <label htmlFor="s1" className="form-label">Choose an image</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        name="profileImage" 
                                        required 
                                        placeholder="upload_file" 
                                        id="s1" 
                                        onChange={handleChange} 
                                    />
                                </div>
                                {preview && (
                                    <div className="mb-3">
                                        <label className="form-label">Image Preview:</label>
                                        <img src={preview} alt="Preview" className="img-thumbnail" />
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default User;
