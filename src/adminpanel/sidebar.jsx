import {  Col, Nav } from 'react-bootstrap';
import React, { Component } from 'react'

export default class sidebar extends Component {
      render() {
            return (
                  <Col md={2} className="sidebar">
                        <h4 className='text-color'>Dashboard Menu</h4>
                        <Nav className="flex-column">
                              <Nav.Link href="/adProduct">Home</Nav.Link>
                              <Nav.Link href="/Product-List">Product-List</Nav.Link>
                              <Nav.Link href="#users">Users</Nav.Link>
                              <Nav.Link href="#settings">Settings</Nav.Link>
                        </Nav>
                  </Col>
            )
      }
}
