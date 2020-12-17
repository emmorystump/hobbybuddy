import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChatWrapper from './chat/chatWrapper';
import 'firebase/auth';
import './homepage.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        return (
            <div>
                <Link to = "/createpost" className="creatPostButton">
                    Create Post
                </Link>
                <ChatWrapper />
            </div>   
        );
    }
}

export default Homepage;