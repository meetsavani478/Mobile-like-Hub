import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import './Order_page.css';
import Header from './Header';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/orders')
      .then(response => {
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/orders/${id}`)
      .then(() => {
        setOrders(orders.filter(order => order._id !== id));
        alert('Order deleted');
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
  };

  const handleView = (order) => {
    alert(`Viewing order: ${order.product_name}`);
  };

  const handleConfirmOrder = (order) => {
    axios.post('http://localhost:4000/confirm', {
      orderId: order._id,
      email: order.email
    })
      .then(() => {
        const updatedOrders = orders.map(o => 
          o._id === order._id ? { ...o, confirmed: true } : o
        );
        setOrders(updatedOrders);
        alert('Order confirmed, email sent to ' + order.email);
      })
      .catch(error => {
        console.error('Error confirming order:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="main">
        <h3>Order List</h3>
        <div className="scrollable-tables">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Quantities</th>
                <th>Product Price</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Order Time</th>
                <th>Order Delivery Date </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={order.image || 'https://w7.pngwing.com/pngs/343/207/png-transparent-iphone-x-iphone-8-plus-iphone-7-apple-iphone-gadget-electronics-mobile-phone.png'}
                        alt={order.product_name}
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>{order.product_name}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.contact}</td>
                    <td>{order.quantities}</td>
                    <td>${order.price?.toFixed(2)}</td>
                    <td>${order.TOtal_price?.toFixed(2)}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{new Date(order.order_date).toLocaleTimeString()}</td>
                    <td>{order.order_date}</td>
                    <td className='button_main'>
                      <Button
                        variant="primary"
                        className="me-2 btn-custom-view"
                        onClick={() => handleView(order)}
                      >
                        View
                      </Button>

                      {!order.confirmed && (
                        <Button
                          variant="danger"
                          className="me-2 btn-custom-confirm"
                          onClick={() => handleConfirmOrder(order)}
                        >
                          Confirm Order
                        </Button>
                      )}

                      {order.confirmed && (
                        <Button
                          variant="success"
                          className="me-2 btn-confirmed"
                          disabled
                        >
                          Confirmed
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        className="btn-custom-delete"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default OrderList;
