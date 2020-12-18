import React, { Component } from 'react';
import './usersHobbies.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './usersHobbies.css'
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class SuggestedHobbies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hobbyOptions: []
        }
    }

    componentDidMount() {
        var self = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var userHobbies = firebase.database().ref('Users/'+userid+"/Hobbies");
                userHobbies.on('value', (snapshot) =>{
                    const hobbies = snapshot.val();
                    if (hobbies.length) {
                        self.setState({
                            hobbyOptions: hobbies,
                        });
                    } 
                });
            } else {
              alert("Sign in first");
            }
        });
    }

    render() {
        const {hobbyOptions} = this.state;
        const hobbyButtonElements = hobbyOptions.map(hobby => 
            <Row><Link className = "hobby-suggested-button" to="/" id={hobby}>{hobby}</Link></Row>);
        
        return (
            <div className = "suggested-hobby-sidebar">
                {hobbyButtonElements}
            </div>
        );
    }
}

export default SuggestedHobbies;