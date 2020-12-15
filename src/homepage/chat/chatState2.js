import React, {Component} from 'react';
import './chatState2.css';
import pushdown from './pushdown.jpg';

class ChatState2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateChange: this.props.stateChange,
            chatList: this.props.chatList
        };
    }
    render() {
        const {stateChange, chatList} = this.state;
        let chats = chatList.map((chat, index) => {
            return (
            <div key={chat} className="chatbox">
                <button className="chatbutton" onClick={() => stateChange(3, index)}>{chat}</button>
                <button className="blockbutton">block</button>
            </div>);
        })
        return (
        <div className="container">
            <div className="chatTopRow">
                Chat
                <img className="pushdown" src={pushdown} onClick={() => stateChange(1, -1)} alt="Back" />
            </div>
            {chats}
        </div>);
    }

}

export default ChatState2;