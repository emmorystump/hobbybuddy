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
            showPopup: false,
            searchedHobby: 'Biking',
        };
        this.switchHobby = this.switchHobby.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }
    
    togglePopup(text, adding) {
        this.setState({
          showPopup: !this.state.showPopup
        });
        this.setState({searchedHobby:text});
        console.log("text")
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
        if (text.length == 0){
            return
        }
        var clickedHobby = text[0].label;
        this.togglePopup(clickedHobby);
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
                        <a href="/requestHobby"><button class="requestHobbyButton">Request Hobby</button></a>
                        <UserHobbies switchHobby={this.switchHobby}/>
                        <ChatWrapper userid={this.state.uid}/>
                    </Col>
                    <Col xs={8}>
                        <PostsWrapper selectedHobby={this.state.selectedHobby}/>
                    </Col>
                    <Col>
                        <SuggestedHobbies switchHobby={this.switchHobby}/>
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
            <h5>Add {this.props.text}?</h5>
            <button onClick={() => this.props.closePopup(this.props.text, true)}>Yes</button>
            <button onClick={() => this.props.closePopup(this.props.text, false)}>Cancel</button>
          </div>
        </div>
      );
    }
  }



export default withRouter(Homepage);