import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper'
import UserHobbies from './usersHobbies/usersHobbies'
import 'firebase/auth';
import './homepage.css';

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
        //     console.log(postState);
        // }
        return (
            <div>
                <UserHobbies />
                <PostsWrapper postState={postState} selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper />
            </div>   
        );
    }
}

export default Homepage;