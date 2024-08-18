import React from 'react';
import './Cssfail/Home.css';
import { NavLink } from 'react-router-dom';
const Product = (props) => {
    const { name, img,id} = props;
    return (
        <form className='Slide-1-main'>
            <NavLink to={'/Phone_Details/'+name+'/'+id}>
                <img src={img} className='Slide-1-img' alt="Product" />
            </NavLink>
            <button type="submit" style={{ display: 'none' }}>Send Link</button>
        </form>
    );
};

export default Product;
