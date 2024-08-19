import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Cssfail/Buypage.css";
import Header from "./Header";
import Footer from "./footer";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const stripePromise = loadStripe("your-public-key-from-stripe");

const CheckoutForm = () => {
  const {num} = useParams();
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
  const [loading, setLoading] = useState(false);
  const [change, setchange] = useState(false);

  const navigate = useNavigate(); 
  useEffect(() => {
    if(num==1){
      setchange(true);
    }else{
      setchange(false);

    }
    const fetchUserData = async () => {
      try {
        if (id) {
          const response = await Axios.get(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/users/${id}`);
          if (response.data) {
            setUserData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await Axios.post(`https://3tw6kivn80.execute-api.ap-south-1.amazonaws.com/users/${id}`, userData);
      if(num==1)
      {
        navigate('/User'); 
      }else{
        navigate('/Payment'); 
      }
      
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit}>
        
      {change&& (<><Row className="mb-3">
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
        </Row></>)}

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
            value={userData.address2||""} 
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
            <Form.Label>Zip</Form.Label>
            <Form.Control
              value={userData.zip || ""} 
              onChange={(e) => setUserData({ ...userData, zip: e.target.value })}
              required
            />
          </Form.Group>
        </Row>
        <div>
        {change &&(
          <Button
          variant="primary"
          type="submit"
          className="Buy_Button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update User Detail"}
        </Button>
        )}
        {!change &&(
          <Button
          variant="primary"
          type="submit"
          className="Buy_Button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Delivery Address"}
        </Button>)
        }
        </div>
      </Form>
    </>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="payment-content">
        <CheckoutForm />
      </div>
      <Footer />
    </Elements>
  );
};

export default PaymentPage;
