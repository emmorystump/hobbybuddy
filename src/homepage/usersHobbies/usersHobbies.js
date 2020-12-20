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
        this.changeSelectedHobby = this.changeSelectedHobby.bind(this);
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

    changeSelectedHobby(hobby) {
        this.setState({
            selectedHobby: hobby,
        });
        this.state.switchHobby(hobby);
    }

    render() {
        const hobbyButtonElements = this.state.hobbyOptions.map(hobby => {
            let hobbybutton;
            if (hobby === this.state.selectedHobby) {
                hobbybutton = (<button 
                    onClick={() => this.changeSelectedHobby(hobby)} 
                    className = "hobby-option-button-selected" 
                    id={hobby}>{hobby}</button>);
            } else {
                hobbybutton = (<button 
                    onClick={() => this.changeSelectedHobby(hobby)} 
                    className = "hobby-option-button-unselected" 
                    id={hobby}>{hobby}</button>);
            }
            return (<div key={hobby}>
                {hobbybutton}
            </div>);
        });
        
        return (
            <div className = "hobby-sidebar">
                <div className = "hobby-sidebar-label">Select hobby to view:</div>
                {hobbyButtonElements}
                <div className="manageHobbyContainer">
                    <Button variant="warning" className="manageHobbyLink" onClick={() => {this.props.history.push('/profile')}}>Manage Hobbies</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(UserHobbies);