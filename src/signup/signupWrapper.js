import React, { Component } from 'react';
import SignupState1 from './signupState1';
import SignupState2 from './signupState2';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import './signupWrapper.css';
import { withRouter } from 'react-router-dom';

class SignupWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curSignupState: 1,
            email: '',
            username: '',
            password: '',
            hobbies: [],
            availableHobbies: [],
        };
        this.stateChange = this.stateChange.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.addHobbies = this.addHobbies.bind(this);
        this.finishSignup = this.finishSignup.bind(this);
    }

    componentDidMount() {
        let database = firebase.database();
        var availableHobbiesRef = database.ref('Hobbies/');
        availableHobbiesRef.once('value', (snapshot) =>{
            let availHobbies = Object.keys(snapshot.val()).map(hobby => ({
                name: hobby,
                selected: false
            }));
            this.setState({availableHobbies: availHobbies});
        });
    }

    stateChange(state) {
        this.setState({curSignupState: state});
    }

    updateEmail(email) {
        this.setState({email: email});
    }
    
    updateUsername(newUsername) {
        this.setState({username: newUsername});
    }

    updatePassword(password) {
        this.setState({password: password});
    }

    addHobbies(hobbyName, availIndex, addOrRemove) {
        let newAvailHobbies = [...this.state.availableHobbies];
        newAvailHobbies[availIndex].selected = addOrRemove;
        let hobbies = [...this.state.hobbies];
        if (addOrRemove) {
            hobbies.push(hobbyName);
        } else {
            hobbies.splice(hobbies.indexOf(hobbyName), 1);
        }
        this.setState(prevState => ({
            availableHobbies: newAvailHobbies,
            hobbies: hobbies
        }));
    }

    finishSignup() {
        var self = this;
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexp.test(this.state.email)) { 
            alert('invalid email address!');
        } else {
            firebase.auth().createUserWithEmailAndPassword(self.state.email, self.state.password)
            .then((user) => {
                
                user.user.updateProfile({
                    displayName: self.state.username,
                  }).then(function() {
                    console.log('sucess...updating database')
                    console.log(user.user.uid);
                    let database = firebase.database();
                    var userRef = database.ref('Users/'+user.user.uid);
                    userRef.set({
                        UserId: user.user.uid,
                        Hobbies: self.state.hobbies,
                        Username: self.state.username,
                    }, (error) => {
                        if (error)
                            console.log(error)
                        else
                            self.props.history.push('/');
                    });

                  }).catch(function(error) {
                    console.log(error);
                  });
                  
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode+":"+errorMessage);
            });
        }

    }

    render() {
        const {curSignupState, email, username, password, hobbies, availableHobbies} = this.state;
        let signupState;
        if (curSignupState === 1) {
            signupState = <SignupState1
                email={email}
                username={username} 
                password={password}
                updateEmail={this.updateEmail}
                updateUsername={this.updateUsername}
                updatePassword={this.updatePassword}
                stateChange={this.stateChange}
            />
        } else {
            signupState = <SignupState2
                availableHobbies={availableHobbies}
                addHobbies={this.addHobbies}
                stateChange={this.stateChange}
                finishSignup={this.finishSignup}
            />
        }
        return (
            <div className="signupWrapper">
                <div className="signupLabel">Welcome!</div>
                {signupState}
            </div>   
        );
    }
}

export default withRouter(SignupWrapper);