import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col, Button, Table, Modal, Dropdown, Form, Spinner } from 'react-bootstrap';
import Sidebar from './sidebar';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaEye, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './List.css';
const List = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setLoadingMessage('Loading items...');
      try {
        const response = await axios.get('http://localhost:4000/api/items');
        const allItems = [...response.data[0], ...response.data[1], ...response.data[2], ...response.data[3], ...response.data[4], ...response.data[5]];
        setItems(allItems);
        setFilteredItems(allItems);  
        setLoadingMessage('');
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoadingMessage('Error fetching items.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories'); 
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item => {
      const matchesCategory = selectedCategory ? item.Brand === selectedCategory : true; 
      const matchesSearch = item.Title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch; 
    });
    setFilteredItems(filtered); 
  }, [selectedCategory, searchQuery, items]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      setLoadingMessage('Deleting item...');
      try {
        await axios.delete(`http://localhost:4000/api/items/${id}`);
        setItems(items.filter(item => item._id !== id)); 
      } catch (error) {
        console.error('Error deleting item:', error);
        setLoadingMessage('Error deleting item.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async (item) => {
    localStorage.setItem('Edit', item._id);
    navigate('/product-listing');
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleSetProduct = () => {
    localStorage.removeItem('Edit');
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
            <Row>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Search for a product"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="mb-3"
                />
              </Col>
              <Col md={4}>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedCategory || 'Select Category'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedCategory('')}>All Categories</Dropdown.Item>
                    {categories.map(category => (
                      <Dropdown.Item key={category.id} onClick={() => setSelectedCategory(category.name)}>
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Button variant="primary" onClick={handleSetProduct} className="mb-3">Add Product</Button>

            {loading && (
              <div className="text-center mb-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>{loadingMessage}</p>
              </div>
            )}
            <div className="scrollable-table">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th> 
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
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
                        <td>{item.category}</td>
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
                      <td colSpan="5" className="text-center">No items available.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
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
    </div>
  );
};

export default List;
