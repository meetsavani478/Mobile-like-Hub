// src/components/PhoneData.js
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import SimpleImageSlider from "react-simple-image-slider";
import './Cssfail/PhoneData.css';
import { NavLink, useParams } from "react-router-dom";
import Footer from './footer';
import loadingImage from '../node/uploads/Animation - 1721482685274 (1).gif';
import Header from "./Header";

const PhoneData = () => {
  const userid = localStorage.getItem("userId");
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name, id } = useParams();

  const fetchData = async () => {
    try {
      const response = await Axios.get(`http://localhost:4000/PhoneDataS/${name}/${id}`);
      const apiData = response.data;
      const { image, Price, Title, Brand, Operating_System, Memory_Storage, Screen_Size, Model_Name, image_1, image_2, image_3, image_4 } = apiData;
      setData({
        price: Price, title: Title, brand: Brand, operating_System: Operating_System,
        memory_Storage: Memory_Storage, screen_Size: Screen_Size, model_Name: Model_Name, image_1: image_1, image_2: image_2, image_3: image_3, image_4: image_4
      });

      const { img_1, img_2, img_3 } = image[0];
      setImages([
        { url: img_1 },
        { url: img_2 },
        { url: img_3 }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the data: ', error);
      window.alert('Error fetching the data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, id]);

  if (loading) {
    return (
      <div className="loading">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="slider-container">
        <SimpleImageSlider
          width="34rem"
          height="45rem"
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={3}
          className="slider"
        />
        <div className="product-details">
          <div className="details-container">
            <h3>{data.title}</h3>
            <div className="rating-container">
              <div className="rating-stars">
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star"></small>
                <small className="fas fa-star-half-alt"></small>
                <small className="far fa-star"></small>
              </div>
              <small className="review-count">(99 Reviews)</small>
            </div>
          </div>
          <br />
          <div className="purchase-container">
            <h3 className="price">{data.price}</h3>
            {userid ? (
              <NavLink to={"/Buy/"+0} className="buy-button">
                Buy Now
              </NavLink>
            ) : (
              <NavLink to="/Login" className="buy-button">
                Login to Buy
              </NavLink>
            )}
          </div>
          <div className="details-section">
            <div className="detail-item">
              <h3> Brand :</h3>
              <h5 className='detail-value'> {data.brand} </h5>
            </div>
            <br />
            <div className="detail-item">
              <h3> Operating System :</h3>
              <h5 className='detail-value'> {data.operating_System} </h5>
            </div>
            <br />
            <div className="detail-item">
              <h3> Memory Storage :</h3>
              <h5 className='detail-value'> {data.memory_Storage} </h5>
            </div>
            <br />
            <div className="detail-item">
              <h3> Screen Size :</h3>
              <h5 className='detail-value'> {data.screen_Size} </h5>
            </div>
            <br />
            <div className="detail-item">
              <h3> Model_Name :</h3>
              <h5 className='detail-value'> {data.model_Name} </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="image-gallery">
        <img className="gallery-image" src={data.image_1} alt="Image 1" />
        <img className="gallery-image" src={data.image_2} alt="Image 2" />
        <img className="gallery-image" src={data.image_3} alt="Image 3" />
        <img className="gallery-image" src={data.image_4} alt="Image 4" />
      </div>
      <Footer />
    </>
  );
};

export default PhoneData;
