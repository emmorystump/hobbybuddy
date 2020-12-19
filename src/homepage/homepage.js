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
            showPopup: false,
            searchedHobby: 'Biking',
        };
        this.switchHobby = this.switchHobby.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }
    
    togglePopup(text) {
        this.setState({
          showPopup: !this.state.showPopup
        });
        this.setState({searchedHobby:text});
      }

    setValues(text) {
        var clickedHobby = text[0].label;
        this.togglePopup(clickedHobby)
    }

    componentWillMount() {
        var self = this;
        var user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged((user) => {
            console.log("succeed");
            console.log(user.email);
            console.log(user.displayName);
            if (user) {
                self.setState({
                    email: user.email,
                    uid: user.uid
                  });
            } else {
              // User is signed out
              // ...
            }
          });
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
        let username;
        firebase.database().ref('Users/'+ this.state.uid).on("value", snapshot => {
            let user =  snapshot.val();
            username = user.Username;     
        });
        return (
            <div>
                <Navbar name={username} />
                {/* <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper /> */}
                <Row>
                    <Col xs={2}>
                        <Select options={HobbySearchList} onChange={(values) => this.setValues(values)} placeholder={"Search Hobbies.."}/>
                        {this.state.showPopup ? 
                            <Popup
                                text={this.state.searchedHobby}
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                            }
                        <UserHobbies switchHobby={this.switchHobby}/>
                        <ChatWrapper />
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


class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>Cancel1</button>
          </div>
        </div>
      );
    }
  }



export default withRouter(Homepage);