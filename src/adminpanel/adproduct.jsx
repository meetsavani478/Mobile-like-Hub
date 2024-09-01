import React from 'react';
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ChartComponent from './ChartComponent';
import PieChartComponent from './PieChartComponent';
import Profit from './Profit';
import './Dashboard.css';
import Header from './Header';
import Sidebar from './sidebar';
const Dashboard = () => {
    return (
        <>
            <Header />
            <Container fluid className="dashboard-container">
                <Row>
                    <Sidebar />
                    <Col md={10} className='main-con mt-5'>
                        <Container>
                            <h1>Dashboard</h1>
                            <Row>
                                <Col md={8}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Sales Chart</Card.Title>
                                            <ChartComponent />
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Profit and Loss</Card.Title>
                                            <Profit />
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Total Sales</Card.Title>
                                            <Card.Text>$1,234,567</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Order-list</Card.Title>
                                            <Card.Text>999</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Products</Card.Title>
                                            <Card.Text>1234</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Users</Card.Title>
                                            <Card.Text>567</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Card.Title>Distribution</Card.Title>
                                            <PieChartComponent />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
