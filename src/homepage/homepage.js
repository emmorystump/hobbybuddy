import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper';
import firebase from "firebase/app";
import 'firebase/auth';
import './homepage.css';
import { withRouter } from 'react-router-dom';
import UserHobbies from './usersHobbies/usersHobbies'
import SuggestedHobbies from './suggestedHobbies/suggestedHobbies'
import 'firebase/auth';
import './homepage.css';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap';
import Navbar from '../components/Navbar';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: 'Biking',
            email: '',
            uid: ''
        };
    }

    componentWillMount() {
        var self = this;
        var user = firebase.auth().currentUser;
        console.log(user);
        if (user) {
          console.log("succeed");
          console.log(user.email);
          self.setState({
            email: user.email,
            uid: user.uid
          });
        } else {
          self.props.history.push('/signup');
        }
    }

    logout() {
        firebase.auth().signOut().then(function() {
            
          }).catch(function(error) {
            // An error happened.
          });
          
    }

    
    render() {
        var postState;
        // if (this.props.postState) {
        //     console.log("heyyy")
        //     console.log(this.props.postState)
        //     postState = this.props.postState;
        // console.log(this.props.postState);
        // }
        return (
            <div>
                <Navbar email={this.state.email} />
                <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper />
                {/* <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper /> */}
                <button onClick={this.logout}>
                    logout
                </button>
                <Row>
                    <Col xs={2}>
                        <UserHobbies />
                        <ChatWrapper />
                    </Col>
                    <Col xs={8}>
                        <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                    </Col>
                    <Col>
                        <SuggestedHobbies />
                    </Col>

                </Row>
            </div>   
        );
    }
}

export default withRouter(Homepage);