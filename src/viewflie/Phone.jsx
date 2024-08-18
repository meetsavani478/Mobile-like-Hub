
import React, { useState } from 'react';
import "./Cssfail/Iphone.css";
import { NavLink } from 'react-router-dom';

const Phone = (props) => {
    const { img, price, title, name, id } = props;

    const [liked, setLiked] = useState(false);

    const handleLike = (e) => {
        e.preventDefault();
        setLiked(!liked);
    };

    return (
        <div className="product-item custom-bg-light mb-4">
            <div className="product-img custom-position-relative overflow-hidden">
                <img className="custom-img-fluid w-100" src={img[0].img_1} alt="Product" loading='lazy' />
                <div className="product-action">
                    <div>
                        <NavLink className="btn custom-btn-outline-dark custom-btn-square" to={`/PhoneData/` + name + '/' + id}>
                            <i className="fa fa-shopping-cart"></i>
                        </NavLink>
                    </div>
                    <a
                        className={`btn custom-btn-outline-dark custom-btn-square ${liked ? 'liked' : ''}`}
                        href="#"
                        onClick={handleLike}
                    >
                        <i className="fa fa-heart"></i>
                    </a>
                    <a className="btn custom-btn-outline-dark custom-btn-square" href="#"><i className="fa fa-sync-alt"></i></a>
                </div>
            </div>
            <div className="text-center py-4">
                <div>
                    <NavLink className="h6 custom-text-decoration-none custom-text-truncate" to={`/PhoneData/` + name + '/' + id}>{title}</NavLink>
                </div>
                <div className="custom-d-flex custom-align-items-center custom-justify-content-center mt-2">
                    <h5>{price}</h5><h6 className="custom-text-muted ml-2"><del>₹1,23,00</del></h6>
                </div>
                <div className="custom-d-flex custom-align-items-center custom-justify-content-center mb-1">
                    <small className="fa fa-star custom-text-primary mr-1"></small>
                    <small className="fa fa-star custom-text-primary mr-1"></small>
                    <small className="fa fa-star custom-text-primary mr-1"></small>
                    <small className="fa fa-star-half-alt custom-text-primary mr-1"></small>
                    <small className="far fa-star custom-text-primary mr-1"></small>
                    <small>(99)</small>
                </div>
            </div>
        </div>
    );
}

export default Phone;
