import React, { Component } from 'react';
import './usersHobbies.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, Redirect, withRouter } from 'react-router-dom';


class UserHobbies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: 'Biking',
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
                            selectedHobby: hobbies[0],
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
        const {selectedHobby, hobbyOptions} = this.state;
        const hobbyButtonElements = hobbyOptions.map(hobby => 
            <Link className = "hobby-option-button" to="/" id={hobby}>{hobby}</Link>);
        
        return (
            <div className = "hobby-sidebar">
                {hobbyButtonElements}
            </div>
        );
    }
}