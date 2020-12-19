import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';

const Navbar = ({name}) => {
    
    return (
        <div>
            <nav>
                <div className="navbar-left">
                    <Link to="/profile" >  {name} </Link>
                </div>
                <div className="navbar-middle">
                    <Link to="/"> Hobby Buddy </Link>
                </div>

                <div className="navbar-right"><button onClick={() => signOut()}> Sign Out </button></div>
                    
            </nav>
        </div>
    )
}

const signOut = () => {
    firebase.auth().signOut().then(function() {
        console.log('signOut Success');
        useHistory().push('/');
    }).catch(function(error) {
    // An error happened.
    });   
};

export default Navbar;