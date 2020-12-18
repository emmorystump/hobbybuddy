import React, { Component } from 'react';
import firebase from "firebase/app";
import { Link } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/database';
import '../postsWrapper.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentToAdd: '',
            userid: ''
        };
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({
                    userid: user.uid
                });
            } else {
              alert("Sign in first");
            }
        });
    }

    addComment() {
        //like the post
        var userId = this.state.userid;
        //add comment to post 
        //clear state "commentToAdd"
        //reload render
    }
    
    render() {
        var post = this.props.postInfo;
        var description = post.Description;
        var id = post.PostId;
        var author = post.Author;
        var commentRendered;
        if (post.Comments) {
            var comments = post.Comments;
            commentRendered = comments.map((comment, index) => {
                var author = comment.Author;
                var content = comment.Content;
                return (
                    <div className="singleComment">
                        <div className="leftAlign">
                            {content}
                        </div>
                        <div className="rightAlign">
                            <text className="postAuthor">{author}</text>
                        </div>
                    </div>); 
            })
        }
        return (
            <div>
                <div key={id} className="postbox">
                    <div>
                        <text className="postAuthor">{author}</text>
                        {description}
                    </div>
                    <div className="rightAlign">
                        <button onClick={() => this.props.likePost(id)}>
                            Like
                        </button>
                    </div>
                </div>
                <div className="commentsList">
                    {commentRendered}
                </div>
                <div className="addCommentBox">
                    <div>
                        Add Comment
                        <textarea className = "input" type = "text" onChange = {(event) => this.setState({commentToAdd: event.target.value })}></textarea>
                    </div>
                    <div className="rightAlign">
                        <button className="commentButton" onClick={this.addComment}>Submit</button>
                    </div>
                    
                </div>
            </div>   
        );
    }
}

export default Post;