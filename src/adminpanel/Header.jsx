import { Container, Row, Col, Card, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      
        <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Mobile-Like-Hub</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/adProduct">Home</Nav.Link>
                            <Nav.Link href="/Product-List">List</Nav.Link>
                            <Nav.Link href="#products">Products</Nav.Link>
                            <Nav.Link href="#users">Users</Nav.Link>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
  }
}
