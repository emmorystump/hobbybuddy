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
            showPostDetail: -1,
            selectedHobby: this.props.selectedHobby,
            username: '',
            likedPosts: [],
            availLocs: [],
            selectedLoc: 'All',
        };
        this.stateChange = this.stateChange.bind(this);
        this.likePost = this.likePost.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var hobbyRef = firebase.database().ref("Hobbies/"+self.props.selectedHobby+"/Posts");
                hobbyRef.once('value', (snapshot) =>{
                    const postObjects = snapshot.val();
                    const arr = Object.values(postObjects);
                    self.setState({
                        postsList: arr,
                        userid: userid,
                        username: user.displayName
                    });
                });  
                var locRef = firebase.database().ref("Locations");
                locRef.once('value', (snapshot) =>{
                    self.setState({
                        availLocs: ['All', ...snapshot.val()]
                    });
                });
            } else {
            }
        });
    }

    updatePosts() {
        var self = this;
        var hobbyRef = firebase.database().ref("Hobbies/"+self.props.selectedHobby+"/Posts");
        hobbyRef.once('value', (snapshot) =>{
            const postObjects = snapshot.val();
            const arr = Object.values(postObjects);
            self.setState({
                postsList: arr,
                selectedHobby: self.props.selectedHobby
            });
        }); 
    }

    stateChange(id) {
        this.setState(prevState => ({
            showPostDetail: id
        }));
    }

    likePost(postId) {
        //like the post
        // var userId = this.state.userid;
        this.setState(prevState => ({
            likedPosts: [...prevState.likedPosts, postId]
        }));
    }
    

    render() {
        // console.log("running render");
        if (this.props.selectedHobby !== this.state.selectedHobby) {
            this.updatePosts();
        }
        let posts;
        if (this.state.showPostDetail === -1) {
            posts = this.state.postsList
                .filter(post =>{ 
                    if (this.state.selectedLoc === 'All')
                        return true;
                    else
                        return post.Location === this.state.selectedLoc;
                }).map((post, index) => {
                var description = post.Description;
                var id = post.PostId;
                var liked = this.state.likedPosts.includes(id);
                var author = post.Author;
                if (id) {
                    return (
                        <div key={id} className="postbox">
                            <div>
                                <div className="postAuthor">{author}</div>
                                {description}
                            </div>
                            <div className="rightAlign">
                                {liked ?
                                <button disabled="true">
                                    Liked
                                </button> :
                                <button onClick={() => this.likePost(id)}>
                                    Like
                                </button>}
                                <button onClick={() => this.stateChange(index)}>
                                    View Post/Comment
                                </button>
                            </div>
                        </div>
                    );
                }
            })  
        }
        else {
            posts = <Post updatePosts={this.updatePosts} username={this.state.username} likePost={this.likePost} likedPosts={this.state.likedPosts} postInfo={this.state.postsList[this.state.showPostDetail]} selectedHobby={this.props.selectedHobby} />
        }
        const locElements = this.state.availLocs.map(loc => 
            <option key={loc} value={loc}>{loc}</option>);
        return (
            <div className="postsWrapper">
                <div id="wrapperHeader">
                    <div className="centerText">
                        <strong>{this.state.selectedHobby}</strong><br></br>
                        <i>Recommended for you:</i>
                    </div>
                    {this.state.showPostDetail === -1 && 
                        <div className="rightAlign">
                            <Link to = "/createpost">
                                <button className="createPostButton">Create Post</button>
                            </Link>
                        </div>
                    }
                    <div>
                        Choose Location:
                        <select className = "input" onChange = {(event) => this.setState({selectedLoc: event.target.value })}>
                            {locElements}
                        </select>
                    </div>
                    {this.state.showPostDetail !== -1 &&
                        <div className="leftAlign">    
                            <button className="backButton" onClick={() => this.stateChange(-1)}>Back</button>
                        </div>
                    }
                </div>
                <div className="mainPostsBox">
                    {posts}
                </div>
            </div>   
        );
    }
}

export default PostsWrapper;
