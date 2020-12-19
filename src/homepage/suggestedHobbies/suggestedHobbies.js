import React, { Component } from 'react';
// import './usersHobbies.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './suggestedHobbies.css'
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class SuggestedHobbies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedHobbies: [],
            hobbyOptions: [],
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
                        if (hobbies.length) {
                            self.setState({
                                addedHobbies: hobbies,
                            });
                        } 
                    }

                });
            }

            if (user) {
                var hobbiesInfo = firebase.database().ref("Hobbies");
                hobbiesInfo.on('value', (snapshot) => {
                    console.log("hobby Info")
                    const hobbies = snapshot.val();

                    var suggested = [];
                    for(let i = 0; i < self.state.addedHobbies.length; i++) {
                        var key = self.state.addedHobbies[i];
                        var hobbyInfo = hobbies[key];
                        var related = hobbyInfo["Related Hobbies"];
                        console.log(related)
                        for(var j in related) {
                            suggested.push(related[j])
                        }
                    }

                    self.setState({
                        hobbyOptions: suggested,
                    });
                    
                });
            }
        });
    }

    render() {
        const {addedHobbies, hobbyOptions} = this.state;
        const hobbyButtonElements = hobbyOptions.map(hobby => 
            <Row key={hobby}><button className = "hobby-suggested-button" to="/" id={hobby}>{hobby}</button></Row>);
        
        return (
            <div className = "suggested-hobby-sidebar">
                {hobbyButtonElements}
            </div>
        );
    }
}

export default SuggestedHobbies;