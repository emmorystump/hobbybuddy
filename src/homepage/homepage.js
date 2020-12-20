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
import Navigationbar from '../components/Navbar';
import Select from 'react-dropdown-select'

const HobbySearchList = [
    { label: "Running", value: 355 },
    { label: "Biking", value: 54 },
    { label: "Painting", value: 43 },
    { label: "Carving", value: 61 },
  ];


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: '',
            email: '',
            uid: '',
            username: '',
            showPopup: false,
            searchedHobby: 'Biking',
            userHobbies: [],
            predefinedChatTarget: '',
        };
        this.switchHobby = this.switchHobby.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.messageAuthor = this.messageAuthor.bind(this);
    }
    
    togglePopup(text, adding) {
        this.setState({
          showPopup: !this.state.showPopup
        });
        this.setState({searchedHobby:text});
        if (adding) {
            let database = firebase.database();
            var hobbyIdRef = database.ref('Hobbies/'+text+"/HobbyId");
            hobbyIdRef.once('value', (snapshot) =>{
                let hobbyId = snapshot.val();
                database.ref('Users/'+this.state.uid+"/Hobbies/").update({
                    [hobbyId]: text
                  }, (error) => {
                      if (error) {
                        alert("Due to server issues, submission failed! Please try again later.");
                      } else {
                          
                      }
                  });
            });
        }
      }

    setValues(text) {
        if (text.length === 0){
            return
        }
        var clickedHobby = text[0].label;
        if (this.state.userHobbies.indexOf(clickedHobby) > -1) {
            return;
        }
        this.togglePopup(clickedHobby);
    }

    messageAuthor(author) {
        this.setState({
            predefinedChatTarget: author
        });
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email);
                console.log(user.displayName);
                self.setState({
                    email: user.email,
                    uid: user.uid,
                    username: user.displayName,
                  });
                  var userHobbies = firebase.database().ref('Users/'+user.uid+"/Hobbies");
                  userHobbies.on('value', (snapshot) =>{
                      const hobbies = snapshot.val();
                      if (hobbies) {
                          self.setState({
                              selectedHobby: Object.keys(hobbies).map(hobbyId => hobbies[hobbyId])[0],
                              userHobbies: Object.keys(hobbies).map(hobbyId => hobbies[hobbyId])
                          });
                      }
                  });
            } else {
                self.props.history.push('/login');
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
                <Navigationbar name={this.state.username} />
                {/* <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper /> */}
                <div className="homepage-container">
                    <Row>
                        <Col xs={3}>
                            <div className="left-col">
                                <div className = 'searchHobbyWrapper'>
                                    <div className="searchBar">
                                    <Select options={HobbySearchList} onChange={(values) => this.setValues(values)} placeholder={"Search Hobbies.."}/>
                                    </div>
                                    {this.state.showPopup ? 
                                        <Popup
                                            text={this.state.searchedHobby}
                                            closePopup={this.togglePopup.bind(this)}
                                        />
                                        : null
                                        }
                                    <a href="/requestHobby"><button class="requestHobbyButton">Request Hobby</button></a>
                                </div>
                                <UserHobbies switchHobby={this.switchHobby}/>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <PostsWrapper selectedHobby={this.state.selectedHobby} messageAuthor={this.messageAuthor}/>
                        </Col>
                        <Col xs={3}>
                            <SuggestedHobbies switchHobby={this.switchHobby}/>
                        </Col>

                    </Row>
                    <ChatWrapper userid={this.state.uid} predefinedTarget={this.state.predefinedChatTarget} />
                </div>
            </div>   
        );
    }
}


class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h5>Add {this.props.text}?</h5>
            <button onClick={() => this.props.closePopup(this.props.text, true)}>Yes</button>
            <button onClick={() => this.props.closePopup(this.props.text, false)}>Cancel</button>
          </div>
        </div>
      );
    }
  }



export default withRouter(Homepage);