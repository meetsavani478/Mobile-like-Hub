import React, { useEffect, useState } from 'react';
import './Cssfail/Home.css';
import {useParams } from 'react-router-dom';
import Product from './Product';
import loadingImage from '../node/uploads/Animation - 1720506783494 (1).gif'; 
import Footer from './footer';
import Header from './Header';
const image = 'http://localhost:4000/';


const Project = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id}=useParams();
    if(props.id){
        localStorage.removeItem('token');
        localStorage.removeItem("userId");
    }
    const Fetch = async () => {
        try {
            const response = await fetch(`http://localhost:4000/Product/${id}`);
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
