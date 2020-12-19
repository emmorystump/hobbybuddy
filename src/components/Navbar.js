import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Button, Nav, Navbar, NavDropdown, Form, FormControl} from 'react-bootstrap'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Navigationbar = ({ name }) => {
    console.log(name)
    if(name == undefined) {
        name="No name"
    }
    return (
        <div>
            <Navbar bg="light" expand="lg" fixed="sticky">
            <Nav className="mr-auto">
                <Nav.Link href="#link">{name}</Nav.Link>
                <Navbar.Brand href="#">Hobby Buddy</Navbar.Brand>

                <Nav.Link href="#">Sign Out</Nav.Link>
                </Nav>
            </Navbar>
            <br />
        </div>
    );
}

export default Navigationbar;