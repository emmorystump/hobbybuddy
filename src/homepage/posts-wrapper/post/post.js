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
            userid: '',
            username: this.props.username,
            selectedHobby: this.props.selectedHobby,
        };
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({
                    userid: user.uid
                });
            } else {
            }
        });
    }

    addComment(id) {
        //add comment to post 
        //clear state "commentToAdd"
        //reload render
        if (this.state.commentToAdd === '') {
            alert("Please add some content to the comment");
            return;
        }
        var username = this.state.username;
        var postId = id;
        var post = this.props.postInfo;
        console.log("entered comment submit")
        let database = firebase.database();
        let commentid = post.Comments ? post.Comments.length : 0;
        console.log('path:'+('Hobbies/'+this.state.selectedHobby+"/Posts/"+id+"/Comments/"+commentid));
        database.ref('Hobbies/'+this.state.selectedHobby+"/Posts/"+postId+"/Comments/"+commentid).set({
            Author: username,
            Content: this.state.commentToAdd
            }, (error) => {
                if (error) {
                    console.log('comment add - error')
                } else {
                    console.log('comment add - success')
                    this.props.updatePosts();
                    this.setState({
                        commentToAdd: '',
                    })
                }
        });
    }
    
    render() {
        var post = this.props.postInfo;
        var description = post.Description;
        var id = post.PostId;
        var liked = this.props.likedPosts.includes(id);
        var author = post.Author;
        var commentRendered;
        if (post.Comments) {
            var comments = post.Comments;
            commentRendered = comments.map((comment, index) => {
                var commentauthor = comment.Author;
                var commentcontent = comment.Content;
                return (
                    <div className="singleComment">
                        <div className="leftAlign">
                            {commentcontent}
                        </div>
                        <div className="rightAlign">
                            <text className="postAuthor">{commentauthor}</text>
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
                            {liked ?
                            <button className="smallButton" disabled="true">
                                Liked
                            </button> :
                            <button className="smallButton" onClick={() => this.props.likePost(id)}>
                                Like
                            </button>}
                    </div>
                </div>
                <div className="commentsList">
                    {commentRendered}
                </div>
                <div className="addCommentBox">
                    <div>
                        Add Comment
                        <textarea className = "input" type = "text" value={this.state.commentToAdd} onChange = {(event) => this.setState({commentToAdd: event.target.value })}></textarea>
                    </div>
                    <div className="rightAlign">
                        <button className="commentButton" onClick={() => this.addComment(id)}>Submit</button>
                    </div>
                    
                </div>
            </div>   
        );
    }
}

export default Post;