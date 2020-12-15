import React, { Component } from 'react';
import './createPostForm.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, withRouter } from 'react-router-dom';

class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            selectedHobby: '',
            description: '',
            hobbyOptions: [],
        }
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var userHobbies = firebase.database().ref('Users/'+userid+"/Hobbies");
                userHobbies.on('value', (snapshot) =>{
                    const hobbies = snapshot.val();
                    if (hobbies.length) {
                        self.setState({
                            selectedHobby: hobbies[0],
                            hobbyOptions: hobbies,
                        });
                    } else {
                        self.setState({
                            selectedHobby: '',
                            hobbyOptions: ["Please add a hobby first"],
                        });
                    }

                });
            } else {
              alert("Sign in first");
            }
        });
    }

    submitForm() {
        var self = this;
        const {title, selectedHobby, description} = this.state;
        if (title.trim() === '' 
            || selectedHobby === ''
            || description.trim() === '') {
                alert("Please enter the required information");
        } else {
            let database = firebase.database();
            var postCountRef = database.ref('Hobbies/'+this.state.selectedHobby+"/Posts/PostCount");
            let newPostCount = 0;
            postCountRef.once('value', (snapshot) =>{
                newPostCount = snapshot.val()+1;
                database.ref('Hobbies/'+this.state.selectedHobby+"/Posts/"+newPostCount).set({
                    PostId: newPostCount,
                    Title: title,
                    Hobby: selectedHobby,
                    Description : description
                  }, (error) => {
                      if (error) {
                        alert("Due to server issues, submission failed! Please try again later.");
                      } else {
                        database.ref('Hobbies/'+this.state.selectedHobby+"/Posts").update({PostCount: newPostCount} , (updateError) => {
                            if (updateError) {
                                alert("Due to server issues, submission failed! Please try again later.");
                            } else {
                                alert("Sucessfully submitted a new post! Redirecting to homepage now...");
                                self.props.history.push('/');
                            }
                        });
                      }
                  });
            });
        }
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {title, selectedHobby, description, hobbyOptions} = this.state;
        const hobbyOptionElements = hobbyOptions.map(hobby => 
            <option key={hobby} value={hobby}>{hobby}</option>);
        return (
            <div className = "content">
                <div className="formToprow">
                    Hobby Buddy
                </div>   
                <div className="newPostLabel">
                    Add New Post
                </div>
                <div className="inputArea">
                    <div className="inputWrapper">
                        Title:
                        <input className = "input" type = "text" value = {title} onChange = {(event) => this.setState({title: event.target.value })} />
                    </div>
                    <div className="inputWrapper">
                        Hobby:
                        <select className = "input" onChange = {(event) => this.setState({selectedHobby: event.target.value })}>
                            {hobbyOptionElements}
                        </select>
                    </div>
                    <div className="inputWrapper">
                        Description:
                        <textarea id = "inputTextarea" className = "input" type = "text" value = {description} onChange = {(event) => this.setState({description: event.target.value })}></textarea>
                    </div>
                    <button className="button" id="submitButton" onClick={this.submitForm}>
                        Submit
                    </button>
                </div>
                <Link className = "button" to="/" id="closeButton">Close</Link>
            </div>
        );
    }
}

export default withRouter(CreatePostForm);