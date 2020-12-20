import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import {Row, Col, Button, Nav, Navbar, NavDropdown, Form, FormControl} from 'react-bootstrap'
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navigationbar = ({ name }) => {
    if(name == undefined) {
        name="No name"
    }
    const history = useHistory();
    return (
        <div>
            <Navbar bg="light" expand="lg" fixed="sticky">
                <Nav className="mr-auto">
                    <Button variant="info" onClick={() => {history.push('/profile')}}>{name}</Button>
                    <Navbar.Brand href="/">Hobby Buddy</Navbar.Brand>
                    <div className="navbar-right"><Button variant="danger" onClick={() => signOut()}> Sign Out </Button></div>
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

export default withRouter(Navigationbar);
