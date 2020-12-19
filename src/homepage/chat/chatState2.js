import React, {Component} from 'react';
import './chatState2.css';
import pushdown from './pushdown.jpg';
import searchIcon from './searchIcon.jpg';

class ChatState2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateChange: this.props.stateChange,
            searchText: '',
            searchUser: this.props.searchUser,
            blockUser: this.props.blockUser,
        };
    }
    render() {
        const {stateChange, searchText, searchUser, blockUser} = this.state;
        let chats = this.props.chatList.map((chat, index) => {
            return (
            <div key={chat} className="chatbox">
                <button className="chatbutton" onClick={() => stateChange(3, index)}>{chat}</button>
                <button className="blockbutton" onClick={() => blockUser(index)}>block</button>
            </div>);
        })
        return (
        <div className="container">
            <div className="chatTopRow">
                Chat
                <img className="chatPushdown" src={pushdown} onClick={() => stateChange(1, -1)} alt="Back" />
            </div>
            <div className="chatSearchBox">
                <input className="chatSearchInput" type="text" placeholder="Search People" value={searchText} onChange={(event) => this.setState({searchText: event.target.value})} />
                <img className="chatSearchIcon" src={searchIcon} onClick={() => searchUser(this.state.searchText)} alt="Search" />
            </div>
            {chats}
        </div>);
    }

}

export default ChatState2;