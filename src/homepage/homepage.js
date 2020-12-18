import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper'
import UserHobbies from './usersHobbies/usersHobbies'
import 'firebase/auth';
import './homepage.css';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHobby: 'Biking'
        };
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
                <Row>
                    <Col xs={2}>
                        <UserHobbies />
                        <ChatWrapper />
                    </Col>
                    <Col>
                        <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                    </Col>

                </Row>
            </div>   
        );
    }
}

export default Homepage;