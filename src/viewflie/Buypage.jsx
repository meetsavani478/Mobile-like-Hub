import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Cssfail/Buypage.css";
import Header from "./Header";
import Footer from "./footer";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CheckoutForm = () => {
  const { num } = useParams();
  const id = localStorage.getItem('userId');
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [productData, setProductData] = useState({
    total: 0,
    discount: 0,
    cost: 0,
    Title:''
  });
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [amount, setAmount] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [quantities, setQuantities] = useState('');



  const navigate = useNavigate();


  const name = localStorage.getItem('Phone_Details');
  const user_id = localStorage.getItem('phone_Details_id');
  const Addcart = localStorage.getItem('ADDcart_total_amount');
  const user_ids = localStorage.getItem('userId');




  useEffect(() => {
    
    if (num == 1) {
      setChange(true);
    } else {
      setChange(false);
    }
    const fetchUserData = async () => {
      try {
        if (id) {
          const userResponse = await Axios.get(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/users/${id}`);
          if (userResponse.data) {
            setUserData(userResponse.data);
          }
          if (Addcart) {
            const productResponse = await Axios.get(`http://localhost:4000/Addcartamount/${Addcart}`);
            if (productResponse.data) {
              setProductData({
                total: productResponse.data.total,
                discount: productResponse.data.discount,
                cost: productResponse.data.cost
              });
              const { data: savedCartItems } = await Axios.get(`http://localhost:4000/addcart/${user_ids}`);
            
              const cartItems=savedCartItems[0].products;
              const quantities = cartItems.map(item => ({
                quantity: item.quantity,
                id: item.index,
                image:item.image,
                name:item.Product_name,
                Price: item.price
              }));
              setQuantities(quantities);
              setAmount(productResponse.data.cost);
              localStorage.removeItem('ADDcart_total_amount');
            }
          } else {
            const productResponse = await Axios.get(`http://localhost:4000/products/${user_id}/${name}`);
            if (productResponse.data) {
              setProductData({
                total: productResponse.data.total,
                discount: productResponse.data.discount,
                cost: productResponse.data.cost,
                Title:productResponse.data.Title
              });
              setAmount(productResponse.data.cost);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/users/${id}`, userData);
      if (num == 1) {
        navigate('/User');
      } else {
        try {
            const orderUrl = 'http://localhost:4000/createOrder';
            const orderResponse = await Axios.post(orderUrl, { amount, currency });
            const { id: order_id, amount: order_amount, currency: order_currency } = orderResponse.data;
          
          
             
            const options = {
                key: 'rzp_test_Z1PlQFw9JxaYjN',
                amount: order_amount,
                currency: order_currency,
                name: 'Mobile Hub',
                description: 'Purchase Product',
                order_id: order_id,
            
                handler: async function (response) {
                  const today = new Date();
                  const orderDate = new Date(today);
                  orderDate.setDate(today.getDate() + 2);
                  try {
                    if (quantities) {
    
                      await Promise.all(
                        quantities.map(product => {
                          return Axios.post('http://localhost:4000/order_product', {
                            product_id: product.id,
                            image:product.image,
                            product_name: product.name,
                            quantities: product.quantity,
                            name: userData.fullName,
                            email: userData.email,
                            contact: userData.phoneNumber,
                            price: product.Price,
                            TOtal_price: amount, 
                            order_date:orderDate.toLocaleDateString()
                          });
                        })
                      );
                      setQuantities(""); 
                    } else {
               
                      await Axios.post('http://localhost:4000/order_product', {
                        product_id: user_id,
                        product_name: productData.Title,
                        name: userData.fullName,
                        email: userData.email,
                        contact: userData.phoneNumber,
                        price: amount,
                        image: 'https://w7.pngwing.com/pngs/343/207/png-transparent-iphone-x-iphone-8-plus-iphone-7-apple-iphone-gadget-electronics-mobile-phone.png',
                        TOtal_price: amount,
                        order_date:orderDate.toLocaleDateString(),
                        quantities: 1,
                      });
                      setQuantities(""); 
                    }
                    alert(`Payment ID: ${response.razorpay_payment_id}`);
                    alert(`Order ID: ${response.razorpay_order_id}`);
                  } catch (error) {
                    console.error("Error while placing order:", error);
                    alert(error);
                  }
                  navigate(`/Project/${id}`);
            },
            prefill: {
              name: userData.fullName,
              email: userData.email,
              contact: userData.phoneNumber,
            },
            theme: {
              color: '#3399cc',
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Error processing payment', error);
        }

      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = async () => {

    if (userData.zip) {
      const cleanedZip = userData.zip.replace(/\D/g, '');
      try {
        const response = await Axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${cleanedZip}&key=AIzaSyDSfL8ILv2EiD07HC-kPK6vdrCh3_zFriw`
        );
        const { lat, lng } = response.data.results[0].geometry.location
        console.log(response.data.results[0].geometry.location)
        setLocation({ lat, lng });
        setShowMap(true);
      } catch (error) {
        console.error('Error fetching location:', error.message);
        alert(`Failed to fetch location. Error: ${error.message}`);
      }
    } else {
      alert('Please enter a zip code.');
    }
  };

  return (
    <>
      <Header />
      <div className="payment-content">
        <Form onSubmit={handleSubmit}>
          {change && (
            <>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={userData.fullName || ""}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={userData.email || ""}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    value={userData.phoneNumber || ""}
                    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                    required
                  />
                </Form.Group>
              </Row>
            </>
          )}

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              value={userData.address1 || ""}
              onChange={(e) => setUserData({ ...userData, address1: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              value={userData.address2 || ""}
              onChange={(e) => setUserData({ ...userData, address2: e.target.value })}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={userData.city || ""}
                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                value={userData.state || ""}
                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                required
              >
                <option>Select State</option>
                <option>Gujarat</option>
                <option>Delhi</option>
                <option>Jammu and Kashmir</option>
                <option>Maharashtra</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">

              <Form.Label> <i className="fa-solid fa-location-dot" onClick={fetchLocation} type="Submit"></i> Zip </Form.Label>
              <Form.Control
                value={userData.zip || ""}
                onChange={(e) => setUserData({ ...userData, zip: e.target.value })}
                required
              />
            </Form.Group>
          </Row>



          <Modal show={showMap} onHide={() => setShowMap(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Location on Map</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LoadScript googleMapsApiKey="AIzaSyDSfL8ILv2EiD07HC-kPK6vdrCh3_zFriw">
                <GoogleMap
                  id="directions-example"
                  mapContainerStyle={{ width: '100%', height: '60vh' }}
                  zoom={14}
                  center={location}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                >
                  <Marker position={location} />
                </GoogleMap>
              </LoadScript>
            </Modal.Body>
          </Modal>


          <div>
            {change && (
              <Button
                variant="primary"
                type="submit"
                className="Buy_Button"
                disabled={loading}
              >
                {loading ? "Saving..." : "Update User Detail"}
              </Button>
            )}
            {!change && (
              <>

                <Row className="mb-3">
                  <Col>
                    <h4>Product Summary</h4>
                    <p><strong>Total:</strong> ₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(productData.total)}</p>
                    <p><strong>Discount:</strong> ₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(productData.discount)}</p>
                    <p><strong>Cost:</strong> ₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(productData.cost)}</p>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="Buy_Button"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Delivery Address"}
                </Button>
              </>
            )}
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};



export default CheckoutForm;
