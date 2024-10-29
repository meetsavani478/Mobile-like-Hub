import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const user_ids = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data: savedCartItems } = await axios.get(`http://localhost:4000/addcart/${user_ids}`);

        if (savedCartItems) {
          setItems(savedCartItems[0].products);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false); 
      }
    };
    
    fetchCartItems();
  }, [user_ids]);

  const updateQuantity = async (delta, index) => {
    try {
      await axios.post(`http://localhost:4000/updateCartQuantity`, {
        user_id: user_ids,
        product_id: index,
        quantity: delta
      });
      const { data: savedCartItems } = await axios.get(`http://localhost:4000/addcart/${user_ids}`);
      if (savedCartItems) {
        setItems(savedCartItems[0].products);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } 
  };

  const removeItem = async (index) => {
    setLoading(true); 
    try {
      await axios.post(`http://localhost:4000/removeCartItem`, {
        user_id: user_ids,
        product_id: index
      });
      const { data: savedCartItems } = await axios.get(`http://localhost:4000/addcart/${user_ids}`);
      if (savedCartItems) {
        setItems(savedCartItems[0].products);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCost = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate();
  const checkout = () => {
    localStorage.setItem('ADDcart_total_amount', totalCost.toFixed(2));
    navigate(`/Buy/${0}`);
  };

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="mb-4 mt-5">
          <Col>
            <h2 className="text-center">Shopping Cart</h2>
          </Col>
        </Row>
        {loading ? (
          <Row className="text-center">
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        ) : (
          <>
            {items.length > 0 ? (
              items.map((item, index) => (
                <Card className="mb-3" key={item.id}>
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <Card.Img variant="top" src={item.image} />
                      </Col>
                      <Col md={5}>
                        <Card.Title>{item.Product_name}</Card.Title>
                        <Card.Text>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(item.price)}</Card.Text>
                      </Col>
                      <Col md={2} className="d-flex align-items-center">
                        <Button variant="light" onClick={() => updateQuantity(-1, index)}>
                          <FaMinus />
                        </Button>
                        <Form.Control type="number" value={item.quantity} min="1" className="mx-2" readOnly />
                        <Button variant="light" onClick={() => updateQuantity(1, index)}>
                          <FaPlus />
                        </Button>
                      </Col>
                      <Col md={2} className="text-end">
                        <Button variant="danger" onClick={() => removeItem(index)}>
                          <FaTrashAlt />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Row className="text-center">
                <Col>
                  <h4>Your cart is empty.</h4>
                </Col>
              </Row>
            )}
            {items.length > 0 && (
              <Row className="mt-4">
                <Col md={8}>
                  <Button variant="warning" size="lg" block onClick={checkout}>
                    Proceed to Checkout
                  </Button>
                </Col>
                <Col md={4} className="text-end">
                  <h4>Total: ₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalCost.toFixed(2))}</h4>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
