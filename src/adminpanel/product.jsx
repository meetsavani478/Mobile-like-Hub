import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert, Spinner } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
      const [category, setCategory] = useState('all');
      const [productDetails, setProductDetails] = useState({
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            image6: '',
            image7: '',
            productName: '',
            brand: '',
            operatingSystem: '',
            memoryStorage: '',
            modelName: '',
            screenSize: '',
            price: ''
      });
      const EditData = localStorage.getItem('Edit');
      const [productList, setProductList] = useState([]);
      const [imageFields, setImageFields] = useState(['image1', 'image2', 'image3']);
      const [errorMessage, setErrorMessage] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const handleCategoryChange = (e) => {
            setCategory(e.target.value);
            localStorage.setItem('category', e.target.value);
      };


      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setProductDetails(prevDetails => ({
                  ...prevDetails,
                  [name]: value
            }));
      };


      const handleAddProduct = async () => {
            const allFieldsFilled = Object.values(productDetails).every(value => value.trim() !== '') && category !== 'all';
            if (!allFieldsFilled) {
                  setErrorMessage('Please fill in all the details before adding the product.');
                  return;
            }
            setErrorMessage('');
            setLoading(true);
            try {
                  const cat = localStorage.getItem('category');
            
                  if (cat) {
                        const apidata = await axios.post(`http://localhost:4000/phondata/${cat}`, productDetails, {
                              headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                              }
                        });
                        if (apidata.data) {
                              navigate('/Product-List');
                        }
                  } else {
                        const apidata = await axios.post(`http://localhost:4000/api/items/${EditData}`,productDetails);
                        if (apidata.data) {
                              navigate('/Product-List');
                        }
                  }
                  console.log('Product added successfully!');
                  setProductList([...productList, productDetails]);
                  setProductDetails({
                        image1: '',
                        image2: '',
                        image3: '',
                        image4: '',
                        image5: '',
                        image6: '',
                        image7: '',
                        productName: '',
                        brand: '',
                        operatingSystem: '',
                        memoryStorage: '',
                        modelName: '',
                        screenSize: '',
                        price: ''
                  });
            } catch (error) {
                  console.error('Error adding product:', error.response ? error.response.data : error.message);
            } finally {
                  setLoading(false);
            }
      };
      const handleAddImageField = () => {
            if (imageFields.length < 7) {
                  setImageFields([...imageFields, `image${imageFields.length + 1}`]);
            }
      };

      useEffect(() => {
            if (EditData) {
                  localStorage.removeItem('category');
                  setCategory("value");


                  const fetchData = async () => {
                        try {
                              const apidata = await axios.get(`http://localhost:4000/api/items/${EditData}`);
                              const { Title, Brand, Operating_System, Memory_Storage, Model_Name, Screen_Size, Price, image_1, image_2, image_3, image_4 } = apidata.data;

                              const newProductDetails = {
                                    image1: apidata.data.image[0].img_1,
                                    image2: apidata.data.image[0].img_2,
                                    image3: apidata.data.image[0].img_3,
                                    image4: image_1,
                                    image5: image_2,
                                    image6: image_3,
                                    image7: image_4,
                                    productName: Title,
                                    brand: Brand,
                                    operatingSystem: Operating_System,
                                    memoryStorage: Memory_Storage,
                                    modelName: Model_Name,
                                    screenSize: Screen_Size,
                                    price: Price
                              };

                              setProductDetails(newProductDetails);

                              setProductList(prevList => [...prevList, newProductDetails]);
                        } catch (error) {
                              alert(error.message || "Error fetching product data");
                        }
                  };

                  fetchData();
            }
      }, [EditData]);

      return (
            <>
                  <Header />
                  <Container fluid className="dashboard-container">
                        <Row>
                              <Sidebar />
                              <Col md={9}>
                                    <h2>Product Listing</h2>
                                    <Form>
                                          <Form.Group controlId="productCategory">
                                                <Form.Label>Select Product Category</Form.Label>
                                                <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                                                      <option value="all">All Categories</option>
                                                      <option value="Iphone">Iphone</option>
                                                      <option value="Samsung">Samsung</option>
                                                      <option value="Vivo">Vivo</option>
                                                      <option value="OnePlus">OnePlus</option>
                                                      <option value="Motorola">Motorola</option>
                                                      <option value="IQoo">IQoo</option>
                                                </Form.Control>
                                          </Form.Group>
                                          {category !== 'all' && (
                                                <>
                                                      <Form.Group controlId="productName">
                                                            <Form.Label>Product Title</Form.Label>
                                                            <Form.Control
                                                                  type="text"
                                                                  name="productName"
                                                                  value={productDetails.productName}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="brand">
                                                            <Form.Label>Brand</Form.Label>
                                                            <Form.Control
                                                                  type="text"
                                                                  name="brand"
                                                                  value={productDetails.brand}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="operatingSystem">
                                                            <Form.Label>Operating System</Form.Label>
                                                            <Form.Control
                                                                  type="text"
                                                                  name="operatingSystem"
                                                                  value={productDetails.operatingSystem}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="memoryStorage">
                                                            <Form.Label>Memory Storage</Form.Label>
                                                            <Form.Control
                                                                  type="text"
                                                                  name="memoryStorage"
                                                                  value={productDetails.memoryStorage}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="modelName">
                                                            <Form.Label>Model Name</Form.Label>
                                                            <Form.Control
                                                                  type="text"
                                                                  name="modelName"
                                                                  value={productDetails.modelName}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="screenSize">
                                                            <Form.Label>Screen Size</Form.Label>
                                                            <Form.Control
                                                                  type="text"
                                                                  name="screenSize"
                                                                  value={productDetails.screenSize}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="price">
                                                            <Form.Label>Price</Form.Label>
                                                            <Form.Control
                                                                  type="number"
                                                                  name="price"
                                                                  value={productDetails.price}
                                                                  onChange={handleInputChange}
                                                            />
                                                      </Form.Group>
                                                      {imageFields.map((imageField, index) => (
                                                            <Form.Group key={index} controlId={imageField}>
                                                                  <Form.Label>{`Product Image URL - ${index + 1}`}</Form.Label>
                                                                  <Form.Control
                                                                        type="text"
                                                                        name={imageField}
                                                                        value={productDetails[imageField]}
                                                                        onChange={handleInputChange}
                                                                  />
                                                            </Form.Group>
                                                      ))}
                                                      {imageFields.length < 7 && (
                                                            <Button variant="secondary" onClick={handleAddImageField}>From the manufacturer Images</Button>
                                                      )}
                                                      <Button variant="primary" onClick={handleAddProduct} disabled={loading} className="ml-2">
                                                            {loading ? <Spinner animation="border" size="sm" /> : 'Add Product'}
                                                      </Button>
                                                      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                                                      <h3 className="mt-4">Product List</h3>
                                                      <Table striped bordered hover>
                                                            <thead>
                                                                  <tr>
                                                                        {imageFields.map((_, index) => (
                                                                              <th key={index}>{`Image ${index + 1}`}</th>
                                                                        ))}
                                                                        <th>Product Title</th>
                                                                        <th>Brand</th>
                                                                        <th>Operating System</th>
                                                                        <th>Memory Storage</th>
                                                                        <th>Model Name</th>
                                                                        <th>Screen Size</th>
                                                                        <th>Price</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {productList.map((product, index) => (
                                                                        <tr key={index}>
                                                                              {imageFields.map((imageField, imgIndex) => (
                                                                                    <td key={imgIndex}>
                                                                                          <img src={product[imageField]} alt={product.productName} width="50" />
                                                                                    </td>
                                                                              ))}
                                                                              <td>{product.productName}</td>
                                                                              <td>{product.brand}</td>
                                                                              <td>{product.operatingSystem}</td>
                                                                              <td>{product.memoryStorage}</td>
                                                                              <td>{product.modelName}</td>
                                                                              <td>{product.screenSize}</td>
                                                                              <td>{product.price}</td>
                                                                        </tr>
                                                                  ))}
                                                            </tbody>
                                                      </Table>
                                                </>
                                          )}
                                    </Form>
                              </Col>
                        </Row>
                  </Container>
            </>
      );
};

export default Product;
