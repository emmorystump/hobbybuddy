import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import {Row, Col, Button, Nav, Navbar, NavDropdown, Form, FormControl} from 'react-bootstrap'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Navigationbar = ({ name }) => {
    if(name == undefined) {
        name="No name"
    }
    return (
        <div>
            <Navbar bg="light" expand="lg" fixed="sticky">
                <Nav className="mr-auto">
                    <Nav.Link href="/profile">{name}</Nav.Link>
                    <Navbar.Brand href="/">Hobby Buddy</Navbar.Brand>
                    <div className="navbar-right"><Button variant="light" onClick={() => signOut()}> Sign Out </Button></div>
                </Nav>
            </Navbar>
        </div>
    );
}

const signOut = () => {
    firebase.auth().signOut().then(function() {
        useHistory().push('/login');
    }).catch(function(error) {
    // An error happened.
    });   
};

export default Navigationbar;
