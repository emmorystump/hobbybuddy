import React, { Component } from 'react';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/auth';

import hobee from './HoBee.png';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    state = {
    isActive: false
    };

    toCredentials = () => {
    this.setState({isActive: true});
    };

    toLogin = () => {
    this.setState({isActive: false});
    };

    finishLogin() {
        var self = this;
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexp.test(this.state.email)) { 
            alert('invalid email address!');
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {

                // Signed in 
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }

    }
    
    render() {
        if (this.state.isActive) {
            return (
                <div>
                    <div className="main">
                        <img src={hobee} alt="HoBee" id="hobee"></img>
                        <div className="title"><h1>Hobby Buddy</h1></div>
                        <div id="credentials">
                            <form method="post">
                                <div class="un">
                                    <input type="text" name="email" placeholder="Email" required="required" value={this.state.email}/>
                                </div>
                                <div class="pass">
                                    <input type="password" name="pwd" placeholder="Password" required="required" value={this.state.password}/>
                                </div>
                                <div class="butt">
                                    <button class="btn btn-secondary" id="back" onClick={this.toLogin}>Back</button>
                                    <span id="submitLogin"><button class="btn btn-info" onClick={() => this.finishLogin()}>Submit</button></span>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
            );
          } else {
            return (
              <div>
                  <div className="main">
                    <img src={hobee} alt="HoBee" id="hobee"></img>
                    <div className="title"><h1>Hobby Buddy</h1></div>
                    <div id="loginMain">
                        <div class="butt"><button onClick={this.toCredentials} class="btn btn-info btn-lg">Log In</button></div>
                        <div class="butt"><button type="submit" class="btn btn-secondary btn-lg">Sign Up</button></div>
                    </div>
                </div>
              </div>
            );
        }
        // return (
            
        // );
    }
}

export default Login;