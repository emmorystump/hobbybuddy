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
                console.log(user.uid);
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
                                if(hobbyInfo != undefined) {
                                // if(hobbyInfo) {
                                console.log(hobbyInfo);
                                var related = hobbyInfo["Related Hobbies"];
                                console.log(related)
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

                    self.setState({
                        hobbyOptions: suggested,
                    });
                    
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
       console.log("originl list" + newHobbyList);

       newHobbyList.push(hobby);
       console.log("added" + newHobbyList);
        
       this.setState({
            addedHobbies: newHobbyList
        });

        this.removeSuggestedHobby(hobby);

        var newKey = newHobbyList.length;
        // add this hobby to the database

        console.log(this.state.uid);

        let database = firebase.database();
        var hobbyIdRef = database.ref('Hobbies/'+hobby+"/HobbyId");
        console.log(hobbyIdRef);
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