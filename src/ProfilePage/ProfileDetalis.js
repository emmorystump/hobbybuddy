import React, { Component } from 'react';
import firebase from "firebase/app";
import Chat from '../homepage/chat/chatWrapper';
import Navbar from '../components/Navbar';
import 'firebase/auth';
import 'firebase/database';
import './profile.css';


class ProfileDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteHobby(hobbyKeys){
        firebase.database().ref('Users/'+ this.props.uid + '/Hobbies/' + hobbyKeys).remove();
    }

    render() {
        let listOfHobbies;
        let hobbyKeys = null;
        if(this.props.hobbies !== undefined){
            hobbyKeys = Object.keys(this.props.hobbies);
        }
        
        if (hobbyKeys != null && hobbyKeys.length > 0) {
            listOfHobbies = (
                <div>
                    <h3 className="box-title">Your hobbies</h3>
                    <div className="hobbies-container">
    
                        {hobbyKeys.map((hobbyKeys, index) =>
                            <div className="hobby-box" key={index}>
                                <div className="deleteBtn" onClick={() => this.deleteHobby(hobbyKeys)}>
                                    <svg height="30" width="30"><rect y="12" x="5" fill="white" width="20" height="5" ></rect> </svg>
                                </div>
                                <h1>{this.props.hobbies[hobbyKeys]}</h1>
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
                <Navbar name={this.props.username} />
                <div className="profile-banner">
                    <div className="user-image"></div>
                    <div className="profile-title" >
                        <h1>{this.props.username}</h1>
                        <p>Some description here that is now static.</p>
                    </div>
                </div>
                <Chat />
                {listOfHobbies}
            </div>   
        )
    }
}

export default ProfileDetails;