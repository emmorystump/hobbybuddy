import React, { Component } from 'react';
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import Post from './post/post'
import 'firebase/auth';
import 'firebase/database';
import './postsWrapper.css';

class PostsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsList: [],
            userid: '',
            showPostDetail: -1
        };
        this.stateChange = this.stateChange.bind(this);
    }

    componentDidMount() {
        var self = this;
        // if (this.props.postState) {
        //     console.log("heyyyyy")
        //     this.stateChange(this.props.postState);
        // }
        // else {
        //     this.stateChange(-1);
        // }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var hobbyRef = firebase.database().ref('Hobbies/Biking/Posts');
                hobbyRef.once('value', (snapshot) =>{
                    const postObjects = snapshot.val();
                    console.log(postObjects);
                    const arr = Object.keys(postObjects).map(uid => Object.values(postObjects[uid]));
                    console.log(arr);
                    self.setState({
                        postsList: arr,
                        userid: userid
                    });
                });   
            } else {
              alert("Sign in first");
            }
        });
    }

    stateChange(id) {
        this.setState(prevState => ({
            showPostDetail: id
        }));
    }
    
    render() {
        let posts;
        if (this.state.showPostDetail === -1) {
            posts = this.state.postsList.map((post, index) => {
                var description = post[0];
                var id = post[2];
                return (
                <div key={id} className="postbox">
                    <div className="postDescription">{description}</div>
                    {/* <Link to="/postdetail"> */}
                    <div className="rightAlign">
                        <button>
                            Like
                        </button>
                        <button onClick={() => this.stateChange(id)}>
                            View Post/Comment
                        </button>
                    </div>
                    {/* </Link> */}
                </div>);
            })  
        }
        else {
            posts = <Post postInfo={this.state.postsList[this.state.showPostDetail]} />
        }
        return (
            <div className="postsWrapper">
                <div id="wrapperHeader">
                    <div className="centerText">
                        <strong>{this.props.selectedHobby}</strong><br></br>
                        <i>Recommended for you:</i>
                    </div>
                    {this.state.showPostDetail === -1 && 
                        <div className="rightAlign">
                            <Link to = "/createpost">
                                <button className="createPostButton">Create Post</button>
                            </Link>
                        </div>
                    }
                    {this.state.showPostDetail !== -1 &&
                        <div className="rightAlign">    
                            <button className="backButton" onClick={() => this.stateChange(-1)}>Back</button>
                        </div>
                    }
                </div>
                <div class="mainPostsBox">
                    {posts}
                </div>
            </div>   
        );
    }
}

export default PostsWrapper;
