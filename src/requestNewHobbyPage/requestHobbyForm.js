import React, { Component } from 'react';
import './requestHobbyForm.css'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link, withRouter } from 'react-router-dom';

class RequestHobbyForm extends Component {
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

    submitForm() {
        var self = this;
        const {title, selectedHobby, description} = this.state;
        alert("Request Submitted");
        self.props.history.push('/');
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {title, selectedHobby, description, hobbyOptions} = this.state;
        const hobbyOptionElements = hobbyOptions.map(hobby => 
            <option key={hobby} value={hobby}>{hobby}</option>);
        return (
            <div className = "content">
                <div className="newPostLabel">
                    Request New Hobby
                </div>
                <div className="inputArea">
                    <div className="inputWrapper">
                        Hobby:
                        <input className = "input" type = "text" value = {title} onChange = {(event) => this.setState({title: event.target.value })} />
                    </div>
                    <div className="inputWrapper">
                        Description:
                        <textarea placeholder="Add a description for this hobby." id = "inputTextarea" className = "input" type = "text" value = {description} onChange = {(event) => this.setState({description: event.target.value })}></textarea>
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

export default withRouter(RequestHobbyForm);