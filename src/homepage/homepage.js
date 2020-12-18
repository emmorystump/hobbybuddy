import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper';
import firebase from "firebase/app";
import 'firebase/auth';
import './homepage.css';
import { withRouter } from 'react-router-dom';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: 'Biking'
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
        //     console.log(postState);
        // }
        return (
            <div>
                <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper />
                <button onClick={this.logout}>
                    logout
                </button>
            </div>   
        );
    }
}

export default withRouter(Homepage);