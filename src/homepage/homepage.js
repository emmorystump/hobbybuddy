import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        firebase.auth().signInWithEmailAndPassword('tomriddle@nowhere.com', 'eightone')
        .then((user) => {
            console.log("succeed");
            console.log(user.user.email);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode+";"+errorMessage)
        });
    }
    
    render() {
        return (
            <div>
                <Link to = "/createpost">
                    Create Post
                </Link>
            </div>   
        );
    }
}

export default Homepage;