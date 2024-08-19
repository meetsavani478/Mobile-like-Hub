import React, { useEffect, useState } from 'react';
import "./Cssfail/Iphone.css";
import Axios from 'axios';
import Phone from './Phone';
import { useNavigate,useParams } from 'react-router-dom';
import loadingImage from '../node/uploads/Animation - 1720506783494 (1).gif';
import Header from './Header';
import Footer from './footer';

const Iphone = () => {
    const id=localStorage.getItem("userId");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { name } = useParams();

    const fetchIphoneData = async () => {
        try {
            const response = await Axios.get(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/Phone_Detail/${name}/${id}`);
            setData(response.data);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching the data:', error);
            navigate('/Login');
            window.alert('Error fetching the data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIphoneData();
    }, []);

    return (
        <section className="Slide-iphone">
            {loading ? (
                <div className='Slide-Loading'>
                    <img src={loadingImage} alt="Loading..." />
                </div>
            ) : (
                <>
                <Header/>
                <div className='Slides-iphone-main'>
                    {data.length > 0 && data.map((product, index) => (
                        <Phone 
                            id={index} 
                            name={name}
                            img={product.image} 
                            price={product.Price}
                            title={product.Title}
                        />
                    ))}
                </div>
                <Footer />
                </>
            )}
        </section>
    );
};

export default Iphone;
