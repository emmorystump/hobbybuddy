import React, { Component } from 'react';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

import './profile.css';
import Chat from '../homepage/chat/chatWrapper';
import Navbar from '../components/Navbar';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            username: "",
            hobbies: [],
            uid: ""
        };
    }

    componentDidMount() {
        let self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let uid = user.uid;
                let userInfo = firebase.database().ref('Users/'+uid);
                userInfo.on('value', (snapshot) =>{
                    let user =  snapshot.val();
                    console.log(user.Hobbies);
                    self.setState({
                        location: user.Location,
                        username: user.Username,
                        hobbies: user.Hobbies,
                        uid: uid
                    })
                });
            } else {
            }
        });
        
    }


    deleteHobby(hobbyKeys){
        let currentHobbies = this.state.hobbies;

        firebase.database().ref('Users/'+ this.state.uid + '/Hobbies/' + hobbyKeys).remove();

        if (hobbyKeys !== -1) {
            currentHobbies.splice(hobbyKeys, 1);
            this.setState({hobbies: currentHobbies});
        }
    }
    
    render() {
        let listOfHobbies;
        let hobbyKeys = Object.keys(this.state.hobbies);
       
        if (this.state.hobbies != null && this.state.hobbies.length > 0) {
            listOfHobbies = (
                <div>
                    <h3 className="box-title">Your hobbies</h3>
                    <div className="hobbies-container">

                        {hobbyKeys.map((hobbyKeys, index) =>
                            <div className="hobby-box" key={index}>
                                <div className="deleteBtn" onClick={() => this.deleteHobby(hobbyKeys)}>
                                    <svg height="30" width="30"><rect y="12" x="5" fill="white" width="20" height="5" ></rect> </svg>
                                </div>
                                <h1>{this.state.hobbies[hobbyKeys]}</h1>
                            </div>
                        )}
                    </div>
                </div>
            )
        } else {
            listOfHobbies = (
                <div className="hobbies-container">
                    <h2 className="box-title">You don't have any hobbies.</h2>
                </div>
            )
        }

        return (
            <div>
                <Navbar name={this.state.username} />
                
                <div className="profile-banner">
                    <div className="user-image"></div>

                    <div className="profile-title" >
                        <h1>{this.state.username}</h1>
                        <p>Some description here that is now static.</p>
                    </div>
                </div>
                <Chat />
                {listOfHobbies}
            </div>   
        );
    }
}

export default Profile;