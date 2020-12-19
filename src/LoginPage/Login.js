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
            location: "",
            username: "",
            hobbies: []
        };
    }

    state = {
    isActive: false
    };

    handleShow = () => {
    this.setState({isActive: true});
    };

    handleHide = () => {
    this.setState({isActive: false});
    };
    
    render() {
        return (
            <div>
                {/* {this.state.isActive && <h1>Hello react</h1>}
                {this.state.isActive ?(
                    <HideButton onClick={this.handleHide}/>
                ) : (
                    <ShowButton onClick={this.handleShow}/>
                )} */}
                <div className="main">
                    <img src={hobee} alt="HoBee" id="hobee"></img>
                    <div className="title"><h1>Hobby Buddy</h1></div>
                    <div id="loginMain">
                        <div class="butt"><button type="button" class="btn btn-info btn-lg">Log In</button></div>
                        <div class="butt"><button type="submit" class="btn btn-secondary btn-lg">Sign Up</button></div>
                    </div>
                    <div className="Credentials">
                        <form method="post">
                            <input type="text" name="usrname" placeholder="Username" required="required" />
                            <input type="password" name="pwd" placeholder="Password" required="required" />
                            <button type="button" class="btn btn-secondary">Back</button>
                            <button type="submit" class="btn btn-info">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;