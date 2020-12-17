import React, { Component } from 'react';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/auth';

import './profile.css';
import Chat from '../homepage/chat/chatWrapper';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            username: "",
            hobbies: []
        };
    }

    componentDidMount() {
        let self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let uid = user.uid;
                var userInfo = firebase.database().ref('Users/'+uid);
                userInfo.on('value', (snapshot) =>{
                    let user =  snapshot.val();
                    self.setState({
                        location: user.Location,
                        username: user.Username,
                        hobbies: user.Hobbies
                    })
                });
            } else {
              alert("Sign in first");
            }
        });
    }
    
    render() {
        return (
            <div>

                <div className="profile-banner">
                    <div className="user-image">
                        
                    </div>

                    <div className="title" >
                        <h1>{this.state.username}</h1>
                        <p>Some description here that is now static.</p>
                    </div>
                </div>
                <Chat />
                <div className="hobbies-container">
                    {this.state.hobbies.map((product, index) =>
                        <div className="hobby-box" key={index}>
                            <h1>{product}</h1>
                        </div>
                    )}
                </div>
            </div>   
        );
    }
}

export default Profile;