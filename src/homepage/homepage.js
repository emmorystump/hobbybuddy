import React, { Component } from 'react';
import ChatWrapper from './chat/chatWrapper';
import PostsWrapper from './posts-wrapper/postsWrapper'
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
        return (
            <div>
                <PostsWrapper selectedHobby={this.state.selectedHobby}/>
                <ChatWrapper />
            </div>   
        );
    }
}

export default Homepage;