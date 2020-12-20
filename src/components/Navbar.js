import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import {Row, Col, Button, Nav, Navbar, Container} from 'react-bootstrap'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Navigationbar = ({ name }) => {
    if(name == undefined) {
        name="No name"
    }
    return (
        <div>
            <Navbar bg="light" expand="lg" fixed="sticky">
                <Container>
                    <Row>
                        <Nav>
                            <Col sm={4}>
                                <Link to="/profile">
                                    <div className="profile-navbar">
                                        <div>
                                            <div className="user-image box"></div>
                                        </div>
                                        <div>
                                            <Nav.Link as={Link} to="/profile">{name}</Nav.Link>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={4}>
                                <Navbar.Brand as={Link} to="/">Hobby Buddy</Navbar.Brand>
                            </Col>
                            <Col sm={4}>
                                <div className="navbar-right"><Button variant="light" onClick={() => signOut()}> Sign Out </Button></div>
                            </Col>
                        </Nav>
                    </Row>
                </Container>
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
