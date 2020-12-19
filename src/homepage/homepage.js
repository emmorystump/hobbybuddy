import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper';
import firebase from "firebase/app";
import 'firebase/auth';
import './homepage.css';
import { withRouter } from 'react-router-dom';
import UserHobbies from './usersHobbies/usersHobbies'
import SuggestedHobbies from './suggestedHobbies/suggestedHobbies'
import 'firebase/auth';
import './homepage.css';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Select from 'react-dropdown-select'

const HobbySearchList = [
    { label: "Running", value: 355 },
    { label: "Biking", value: 54 },
    { label: "Painting", value: 43 },
    { label: "Impressionism Painting", value: 61 },
    { label: "Knitting", value: 965 },
    { label: "Hiking", value: 46 },
    { label: "Board Games", value: 58 }
  ];


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: 'Biking',
            email: '',
            uid: ''
        };
        this.switchHobby = this.switchHobby.bind(this);
    }

    setValues(text) {
        alert(text)
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

    switchHobby(hobby) {
        this.setState({
            selectedHobby: hobby
        });
    }

    render() {
        var postState;
        // if (this.props.postState) {
        //     console.log("heyyy")
        //     console.log(this.props.postState)
        //     postState = this.props.postState;
        // console.log(this.props.postState);
        // }
        return (
            <div>
                <Navbar email={this.state.email} />
                {/* <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper /> */}
                <Row>
                    <Col xs={2}>
                        <Select options={HobbySearchList} onChange={(values) => this.setValues(values)} placeholder={"Search Hobbies.."}/>
                        <UserHobbies switchHobby={this.switchHobby}/>
                        <ChatWrapper />
                    </Col>
                    <Col xs={8}>
                        <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                    </Col>
                    <Col>
                        <SuggestedHobbies />
                    </Col>

                </Row>
            </div>   
        );
    }
}

export default withRouter(Homepage);