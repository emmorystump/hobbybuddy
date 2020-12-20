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
                        self.setState({
                            addedHobbies: Object.keys(hobbies).map(hobbyId => hobbies[hobbyId]),
                            uid: userid
                        });
                    }

                });
            }

            if (user) {
                var hobbiesInfo = firebase.database().ref("Hobbies");
                hobbiesInfo.on('value', (snapshot) => {
                    const hobbies = snapshot.val();
                    if (hobbies) {
                        var suggested = [];
                        for(let i = 0; i < self.state.addedHobbies.length; i++) {
                            var key = self.state.addedHobbies[i];
                            var hobbyInfo = hobbies[key];
                                if(hobbyInfo != undefined) {
                                    var related = hobbyInfo["Related Hobbies"];
                                    for(var j in related) {
                                        if(self.state.addedHobbies.indexOf(related[j]) == -1) {
                                            suggested.push(related[j])
                                        }
                                    }
                            }
                        }
    
                        self.setState({
                            hobbyOptions: suggested    
                        });
                    }
                    
                });
            }
        });
    }

    removeSuggestedHobby(e) {
        var array = this.state.hobbyOptions
        var index = array.indexOf(e)
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({hobbyOptions: array});
        }
      }

    addHobby(hobby) {
       // eslint-disable-next-line no-restricted-globals
       if (!confirm("Adding "+hobby+"?")) {
            return;
       }
       var newHobbyList = this.state.addedHobbies;

       newHobbyList.push(hobby);
        
       this.setState({
            addedHobbies: newHobbyList
        });

        this.removeSuggestedHobby(hobby);

        var newKey = newHobbyList.length;
        // add this hobby to the database


        let database = firebase.database();
        var hobbyIdRef = database.ref('Hobbies/'+hobby+"/HobbyId");
        hobbyIdRef.once('value', (snapshot) => {
            let hobbyId = snapshot.val();
            database.ref('Users/'+this.state.uid+"/Hobbies/").update({
                [hobbyId]: hobby
                }, (error) => {
                    if (error) {
                        console.log('hobby add - error')
                    } else {
                        console.log('hobby add - success')
                    }
            });
        })
        // call switch hobby
        this.state.switchHobby(hobby)
    }

    render() {
        const {addedHobbies, hobbyOptions} = this.state;
        const hobbyButtonElements = hobbyOptions.map(hobby => 
            <Row key={hobby}><Button variant="primary" onClick={() => this.addHobby(hobby)} className = "hobby-suggested-button" to="/" id={hobby}>{hobby}</Button></Row>);
        
        return (
            <div className = "suggested-hobby-sidebar">
                <h4>Suggested Hobbies</h4>
                {hobbyButtonElements}
            </div>
        );
    }
}

export default SuggestedHobbies;