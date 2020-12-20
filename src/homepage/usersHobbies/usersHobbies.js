import React, { Component } from 'react';
import './usersHobbies.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './usersHobbies.css'
import {Row} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class UserHobbies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: '',
            hobbyOptions: [],
            switchHobby: this.props.switchHobby,
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
                    if (hobbies) {
                        self.setState({
                            selectedHobby: hobbies[Object.keys(hobbies)[0]],
                            hobbyOptions: Object.keys(hobbies).map(hobbyId => hobbies[hobbyId])
                        });
                    }
                });
            } 
        });
    }

    render() {
        const hobbyButtonElements = this.state.hobbyOptions.map(hobby => 
            <Row key={hobby}><Button variant="light" onClick={() => this.state.switchHobby(hobby)} className = "hobby-option-button" to="/" id={hobby}>{hobby}</Button></Row>);
        
        return (
            <div className = "hobby-sidebar">
                {hobbyButtonElements}
            </div>
        );
    }
}

export default UserHobbies;