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
                    <button onClick={() => this.stateChange(id)}>
                        View Post/Comment
                    </button>
                </div>);
            })
        }
        else {
            posts = <Post stateChange={this.stateChange} postInfo={this.state.postsList[this.state.showPostDetail]} />
        }
        return (
            <div>
                <div id="wrapperHeader">
                    <strong>{this.props.selectedHobby}</strong><br></br>
                    <i>Recommended for you:</i>
                </div>
                <div>
                    <Link to = "/createpost" className="creatPostButton">
                        Create Post
                    </Link>
                </div>
                <div class="mainPostsBox">
                    {posts}
                </div>
            </div>   
        );
    }
}

export default PostsWrapper;
