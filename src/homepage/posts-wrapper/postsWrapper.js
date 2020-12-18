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
        this.likePost = this.likePost.bind(this);
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var hobbyRef = firebase.database().ref("Hobbies/"+self.props.selectedHobby+"/Posts");
                hobbyRef.once('value', (snapshot) =>{
                    const postObjects = snapshot.val();
                    console.log(postObjects);
                    // const arr = Object.keys(postObjects).map(uid => Object.values(postObjects[uid]));
                    const arr = Object.values(postObjects);
                    console.log(arr);
                    self.setState({
                        postsList: arr,
                        userid: userid
                    });
                });   
            } else {
            //   alert("Sign in first");
            }
        });
    }

    stateChange(id) {
        this.setState(prevState => ({
            showPostDetail: id
        }));
    }

    likePost(postId) {
        //like the post
        var userId = this.state.userid;
    }
    
    render() {
        let posts;
        if (this.state.showPostDetail === -1) {
            posts = this.state.postsList.map((post, index) => {
                var description = post.Description;
                var id = post.PostId;
                var author = post.Author;
                if (id) {
                    return (
                        <div key={id} className="postbox">
                            <div>
                                <text className="postAuthor">{author}</text>
                                {description}
                            </div>
                            <div className="rightAlign">
                                <button onClick={() => this.likePost(id)}>
                                    Like
                                </button>
                                <button onClick={() => this.stateChange(index)}>
                                    View Post/Comment
                                </button>
                            </div>
                        </div>);
                }
            })  
        }
        else {
            posts = <Post likePost={this.likePost} postInfo={this.state.postsList[this.state.showPostDetail]} selectedHobby={this.props.selectedHobby} />
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
                        <div className="leftAlign">    
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
