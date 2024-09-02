import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);
  const user_id = localStorage.getItem('phone_Details_id');
  const name = localStorage.getItem('Phone_Details');

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cart_items');
    if (savedCartItems) {
      setItems(JSON.parse(savedCartItems));
    }
  }, [user_id, name]);

  const updateQuantity = (id, delta) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      );
      localStorage.setItem('cart_items', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (name, id) => {   
  setItems(prevItems => {
    const updatedItems = prevItems.filter(item => item.name !== name || item.id !== id);
    
  
    localStorage.setItem('cart_items', JSON.stringify(updatedItems));
    
    return updatedItems;
  });
};

  const totalCost = items.reduce((acc, item) => acc + item.price * item.quantity, 0);



  const navigate = useNavigate();
  const checkout = () =>{
    localStorage.setItem('ADDcart_total_amount',totalCost.toFixed(2));
    navigate(`/Buy/${0}`);
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Shopping Cart</h2>
        </Col>
      </Row>
      {items.length > 0 ? (
        items.map(item => (
          <Card className="mb-3" key={item.id}>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={3}>
                  <Card.Img variant="top" src={item.image} />
                </Col>
                <Col md={5}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(item.price)}</Card.Text>
                </Col>
                <Col md={2} className="d-flex align-items-center">
                  <Button variant="light" onClick={() => updateQuantity(item.id, -1)}>
                    <FaMinus />
                  </Button>
                  <Form.Control type="number" value={item.quantity} min="1" className="mx-2" readOnly />
                  <Button variant="light" onClick={() => updateQuantity(item.id, 1)}>
                    <FaPlus />
                  </Button>
                </Col>
                <Col md={2} className="text-end">
                  <Button variant="danger" onClick={() => removeItem(item.name,item.id)}>
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
    </Container>
  );
};

export default Cart;
