import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper';
import firebase from "firebase/app";
import 'firebase/auth';
import './homepage.css';
import 'firebase/database';
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
            uid: '',
            username: '',
        };
        this.switchHobby = this.switchHobby.bind(this);
    }

    setValues(text) {
        alert(text)
    }

    componentWillMount() {
        var self = this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("succeed");
                console.log(user.email);
                console.log(user.displayName);
                self.setState({
                    email: user.email,
                    uid: user.uid,
                    username: user.displayName,
                  });
            } else {
                self.props.history.push('/signup');
            }
          });
    }

    switchHobby(hobby) {
        this.setState({
            selectedHobby: hobby
        });
    }

    render() {
        return (
            <div>
                <Navbar name={this.state.username} />
                {/* <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper /> */}
                <Row>
                    <Col xs={2}>
                        <Select options={HobbySearchList} onChange={(values) => this.setValues(values)} placeholder={"Search Hobbies.."}/>
                        <UserHobbies switchHobby={this.switchHobby}/>
                        <ChatWrapper userid={this.state.uid}/>
                    </Col>
                    <Col xs={8}>
                        <PostsWrapper selectedHobby={this.state.selectedHobby}/>
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