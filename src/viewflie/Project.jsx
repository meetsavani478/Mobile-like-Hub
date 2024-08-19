import React, { useEffect, useState } from 'react';
import './Cssfail/Home.css';
import {useParams } from 'react-router-dom';
import Product from './Product';
import loadingImage from '../node/uploads/Animation - 1720506783494 (1).gif'; 
import Footer from './footer';
import Header from './Header';
const image = 'https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/';


const Project = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id}=useParams();
    const Fetch = async () => {
        try {
            const response = await fetch(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/Product/${id}`);
            const apiData = await response.json();
            setData(apiData);
        } catch (error) {
            console.error('Error fetching the data: ', error);
            window.alert('Error fetching the data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Fetch();
    }, []);

    
    return (
        <><Header/>
            <section >
                {loading ? (
                    <div className='Slide-Loading'>
                        <img src={loadingImage} alt="Loading..." />
                    </div>
                ) : (
                    <div className='Slides-1' style={{ backgroundColor: '#f5f5f5' }}>
                        {data.length > 0 && data.map((product, index) => (
                            <Product
                                key={index}
                                id={product._id}
                                img={product.img}
                                name={product.name}
                            />
                        ))}
                    </div>
                )}
            </section>
           <Footer/>
        </>
    );
}

export default Project;
