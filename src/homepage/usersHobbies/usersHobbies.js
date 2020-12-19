import React, { Component } from 'react';
import './usersHobbies.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './usersHobbies.css'
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class UserHobbies extends Component {
    constructor(props) {
        super(props);
        console.log("in here!");
        this.state = {
            selectedHobby: '',
            hobbyOptions: []
        }
    }

    componentDidMount() {
        var self = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                console.log("here:"+userid);
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
            } 
        });
    }

    render() {
        const {selectedHobby, hobbyOptions} = this.state;
        const hobbyButtonElements = hobbyOptions.map(hobby => 
            <Row><Link className = "hobby-option-button" to="/" id={hobby}>{hobby}</Link></Row>);
        
        return (
            <div className = "hobby-sidebar">
                {hobbyButtonElements}
            </div>
        );
    }
}

export default UserHobbies;