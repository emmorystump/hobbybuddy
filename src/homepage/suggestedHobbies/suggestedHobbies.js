import React, { Component } from 'react';
// import './usersHobbies.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './suggestedHobbies.css'
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'


class SuggestedHobbies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedHobbies: [],
            hobbyOptions: [],
            switchHobby: this.props.switchHobby,
            uid: ''
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
                                uid: userid
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
                    if (hobbies) {
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
                            uid: user.id
    
                        });
                    }

                    
                });
            }
        });
    }

    removeSuggestedHobby(e) {
        console.log(e)
        var array = this.state.hobbyOptions
        var index = array.indexOf(e)
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({hobbyOptions: array});
        }
        console.log(this.state.hobbyOptions);
      }

    addHobby(hobby) {
       var newHobbyList = this.state.addedHobbies;
       console.log(newHobbyList);

       newHobbyList.push(hobby);
       console.log(newHobbyList);
        
       this.setState({
            addedHobbies: newHobbyList
        });

        this.removeSuggestedHobby(hobby);

        var newKey = newHobbyList.length;
        console.log(newKey);
        // add this hobby to the database

        let database = firebase.database();
        var userHobbies = database.ref('Users/'+this.state.uid+"/Hobbies");
        console.log(userHobbies)
        var newUserHobby = userHobbies.push();
        console.log(newUserHobby);
        // newUserHobby.set({hobby})
        userHobbies.on('value', (snapshot) =>{
            database.ref('Users/'+this.state.uid+"/Hobbies").set({
                newKey: hobby
                }, (error) => {
                    console.log("error");

            });
        });

        // call switch hobby
        this.state.switchHobby(hobby)
    }

    render() {
        const {addedHobbies, hobbyOptions} = this.state;
        const hobbyButtonElements = hobbyOptions.map(hobby => 
            <Row key={hobby}><Button variant="light" onClick={() => this.addHobby(hobby)} className = "hobby-suggested-button" to="/" id={hobby}>{hobby}</Button></Row>);
        
        return (
            <div className = "suggested-hobby-sidebar">
                <h4>Suggested Hobbies</h4>
                {hobbyButtonElements}
            </div>
        );
    }
}

export default SuggestedHobbies;