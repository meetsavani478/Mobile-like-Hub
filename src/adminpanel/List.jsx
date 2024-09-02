import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col, Button, Table, Modal, Dropdown, Form, Nav } from 'react-bootstrap';
import Sidebar from './sidebar';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaEye, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [items, setItems] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/items');
        setItems([...response.data[0], ...response.data[1], ...response.data[2], ...response.data[3], ...response.data[4]]);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/items/${selectedItem._id}`, selectedItem);
      setItems(items.map(item => (item._id === selectedItem._id ? selectedItem : item)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleInputChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const handleSetProduct = () => {
    navigate('/product-listing');
  };

  return (
    <div>
      <Header />
      <Container fluid className="dashboard-container">
        <Row>
          <Sidebar />
          <Col md={10} className="main-con mt-5">
            <h2>Product List</h2>
            <Button variant="primary" onClick={handleSetProduct} className="mb-3">Add Product</Button> 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map(item => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0].img_1 : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'}
                          alt={item.Title}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{item.Title}</td>
                      <td>₹ {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(item.Price)}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <FaEllipsisV />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleEdit(item)}>
                              <FaEdit /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleViewImage(item.image[0]?.img_1)}>
                              <FaEye /> View
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(item._id)}>
                              <FaTrashAlt /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No items available.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Product" style={{ width: '100%', height: 'auto' }} />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={selectedItem.Title || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="Price"
                  value={selectedItem.Price || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={selectedItem.image[0]?.img_1 || ''}
                  onChange={(e) => setSelectedItem({
                    ...selectedItem,
                    image: [{ img_1: e.target.value }]
                  })}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleEditSave}>
                Save Changes
              </Button>
            </Form>
          )}
          <Nav.Link href="/product-listing">Products</Nav.Link>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default List;
