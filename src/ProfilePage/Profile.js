import React, { Component } from 'react';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

import './profile.css';
import ChatWrapper from '../homepage/chat/chatWrapper';
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


    deleteHobby(hobby){
        let currentHobbies = this.state.hobbies;
        let index = currentHobbies.indexOf(hobby)
        if (index !== -1) {
            currentHobbies.splice(index, 1);
            this.setState({hobbies: currentHobbies});
            firebase.database().ref('Users/'+ this.state.uid + '/Hobbies/' + index).remove();
        }
    }
    
    render() {
        let listOfHobbies;
        console.log(this.state.hobbies);
        if (this.state.hobbies != null) {
            listOfHobbies = (
                <div>
                    <h3 className="box-title">Your hobbies</h3>
                    <div className="hobbies-container">
                        {this.state.hobbies.map((hobby, index) =>
                            <div className="hobby-box" key={index}>
                                <div className="deleteBtn" onClick={() => this.deleteHobby(hobby)}>
                                    <svg height="30" width="30"><rect y="12" x="5" fill="white" width="20" height="5" ></rect> </svg>
                                </div>
                                <h1>{hobby}</h1>
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

                    <div className="title" >
                        <h1>{this.state.username}</h1>
                        <p>Some description here that is now static.</p>
                    </div>
                </div>
                {listOfHobbies}
                <ChatWrapper userid={this.state.uid}/>
            </div>   
        );
    }
}

export default Profile;