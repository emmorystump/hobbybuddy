import React, { Component } from 'react';
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/database';
//import './postsWrapper.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
        };
    }

    componentDidMount() {
        var self = this;
        
        // firebase.auth().onAuthStateChanged(function(user) {
            // if (user) {
                // let userid = user.uid;
                // var userChatlogsRef = firebase.database().ref('Users/'+userid+"/Chatlogs");
                // userChatlogsRef.once('value', (snapshot) =>{
                //     const chatlogObjects = snapshot.val();
                //     self.setState({
                //         chatlogs: Object.keys(chatlogObjects).map(uid => chatlogObjects[uid]),
                //         userid: userid
                //     });
                // });
                
                //get posts information for current hobby (this.props.selectedHobby)
                //store using self.setState?

            // } else {
            //   alert("Sign in first");
            // }
        // });
    }
    
    render() {
        
        return (
            <div>
                <div>
                    <button onClick={() => this.props.stateChange(-1)}>Back</button>
                </div>
            </div>   
        );
    }
}

export default Post;