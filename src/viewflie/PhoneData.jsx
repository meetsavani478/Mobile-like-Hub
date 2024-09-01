
// import React, { useEffect, useState } from "react";
// import Axios from 'axios';
// import SimpleImageSlider from "react-simple-image-slider";
// import './Cssfail/PhoneData.css';
// import { NavLink, useParams } from "react-router-dom";
// import Footer from './footer';
// import loadingImage from '../node/uploads/Animation - 1721482685274 (1).gif';
// import Header from "./Header";

// const PhoneData = () => {
//   const userid = localStorage.getItem("userId");
//   const [data, setData] = useState({});
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { name, id } = useParams();

//   const fetchData = async () => {
//     try {
//       const response = await Axios.get(`http://localhost:4000/PhoneDataS/${name}/${id}`);
//       const apiData = response.data;
//       const { image, Price, Title, Brand, Operating_System, Memory_Storage, Screen_Size, Model_Name, image_1, image_2, image_3, image_4 } = apiData;
//       setData({
//         price: Price, title: Title, brand: Brand, operating_System: Operating_System,
//         memory_Storage: Memory_Storage, screen_Size: Screen_Size, model_Name: Model_Name, image_1: image_1, image_2: image_2, image_3: image_3, image_4: image_4
//       });

//       const { img_1, img_2, img_3 } = image[0];
//       setImages([
//         { url: img_1 },
//         { url: img_2 },
//         { url: img_3 }
//       ]);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching the data: ', error);
//       window.alert('Error fetching the data');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [name, id]);

//   if (loading) {
//     return (
//       <div className="loading">
//         <img src={loadingImage} alt="Loading..." />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="slider-container">
//         <SimpleImageSlider
//           width="34rem"
//           height="45rem"
//           images={images}
//           showBullets={true}
//           showNavs={true}
//           autoPlay={true}
//           autoPlayDelay={3}
//           className="slider"
//         />
//         <div className="product-details">
//           <div className="details-container">
//             <h3>{data.title}</h3>
//             <div className="rating-container">
//               <div className="rating-stars">
//                 <small className="fas fa-star"></small>
//                 <small className="fas fa-star"></small>
//                 <small className="fas fa-star"></small>
//                 <small className="fas fa-star-half-alt"></small>
//                 <small className="far fa-star"></small>
//               </div>
//               <small className="review-count">(99 Reviews)</small>
//             </div>
//           </div>
//           <br />
//           <div className="purchase-container">
//             <h3 className="price">{data.price}</h3>
//             {userid ? (
//               <NavLink to={"/Buy/"+0} className="buy-button">
//                 Buy Now
//               </NavLink>
//             ) : (
//               <NavLink to="/Login" className="buy-button">
//                 Login to Buy
//               </NavLink>
//             )}
//           </div>
//           <div className="details-section">
//             <div className="detail-item">
//               <h3> Brand :</h3>
//               <h5 className='detail-value'> {data.brand} </h5>
//             </div>
//             <br />
//             <div className="detail-item">
//               <h3> Operating System :</h3>
//               <h5 className='detail-value'> {data.operating_System} </h5>
//             </div>
//             <br />
//             <div className="detail-item">
//               <h3> Memory Storage :</h3>
//               <h5 className='detail-value'> {data.memory_Storage} </h5>
//             </div>
//             <br />
//             <div className="detail-item">
//               <h3> Screen Size :</h3>
//               <h5 className='detail-value'> {data.screen_Size} </h5>
//             </div>
//             <br />
//             <div className="detail-item">
//               <h3> Model_Name :</h3>
//               <h5 className='detail-value'> {data.model_Name} </h5>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="image-gallery">
//         <img className="gallery-image" src={data.image_1} alt="Image 1" />
//         <img className="gallery-image" src={data.image_2} alt="Image 2" />
//         <img className="gallery-image" src={data.image_3} alt="Image 3" />
//         <img className="gallery-image" src={data.image_4} alt="Image 4" />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PhoneData;
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import SimpleImageSlider from "react-simple-image-slider";
import './Cssfail/PhoneData.css';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from './footer';
import loadingImage from '../node/uploads/Animation - 1721482685274 (1).gif';
import Header from "./Header";
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";

const PhoneData = () => {
  const userid = localStorage.getItem("userId");
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const { name, id } = useParams();
  localStorage.setItem('Phone_Details', name);
  localStorage.setItem('phone_Details_id', id);
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

  const handleBuyNow = () => {
    setShowBuyModal(true);
  };

  const navigate = useNavigate();
  const Confirm_Purchase = () => {
    navigate(`/Buy/${0}`);
  }


  const View_Cart = () => {
    const fetchCartData = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:4000/addcart/${id}/${name}`);
        const phone_data = productResponse.data;
  
        const fetchedItems = phone_data.map(item => ({
          id: item.id,
          name: item.Title,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }));
  
        const existingCartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
  
        const updatedCartItems = fetchedItems.reduce((acc, newItem) => {
          const existingItemIndex = acc.findIndex(item => item.id === newItem.id);
          if (existingItemIndex !== -1) {
            acc[existingItemIndex].quantity += newItem.quantity;
          } else {
           
            acc.push(newItem);
          }
          return acc;
        }, existingCartItems);
  
        localStorage.setItem('cart_items', JSON.stringify(updatedCartItems));
  
        navigate(`/Addcart`);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
  
    fetchCartData();
  }
  

  const handleCloseBuyModal = () => setShowBuyModal(false);
  const handleCloseCartModal = () => setShowCartModal(false);

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
            <h3 className="price">₹{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(data.price)}</h3>
            {userid ? (
            <>
              <Button variant="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button variant="secondary" onClick={View_Cart} className="ms-2">
              Add to Cart
            </Button>
            </>
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

      <Modal show={showBuyModal} onHide={handleCloseBuyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buy Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Proceed to checkout for {data.title}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBuyModal}>
            Close
          </Button>
          <Button variant="primary" onClick={Confirm_Purchase}>
            Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default PhoneData;
