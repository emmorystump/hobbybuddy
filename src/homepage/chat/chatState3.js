import React, {Component} from 'react';
import './chatState3.css';
import pushdown from './pushdown.jpg';
import back from './back.jpg';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

class ChatState3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateChange: this.props.stateChange,
            target: this.props.target,
            messages: this.props.messages,
            messageDraft: '',
            userid: this.props.userid,
            targetid: this.props.targetid,
        };
        this.sendMessage = this.sendMessage.bind(this);
    }
    sendMessage() {
        let newMsgId = this.state.messages.length;
        let newMsgObject = {
            Content: this.state.messageDraft,
            Type: 'to'
        }
        let database = firebase.database();
        var messageRef = database.ref('Users/'+this.state.userid+"/Chatlogs/"+this.state.targetid+"/Messages/"+newMsgId);
        messageRef.set(newMsgObject, (error) => {
            if (error) {
                alert("Due to server issues, submission failed! Please try again later.");
            } else {
                this.setState(prevState => ({
                    messageDraft: '',
                    messages: [...prevState.messages, newMsgObject]
                }));
            }
        });
    }
    render() {
        const {stateChange, target, messages, messageDraft} = this.state;
        let messageElements = messages.map((message,index) => {
            if (message.Type === 'to') {
                return <div key = {index} className="toMessages">{message.Content}</div>
            } else 
                return <div key = {index} className="fromMessages">{message.Content}</div>
        })
        return (
        <div className="container">
            <div className="targetTopRow">
                <img className="back" src={back} onClick={() => stateChange(2, -1)} alt="Back" />
                Chat
                <img className="pushdown" src={pushdown} onClick={() => stateChange(1, -1)} alt="Back" />
            </div>
            <div className="messageBox">
                <div className="nameLabel">{target}</div>
                {messageElements}
                <div className="sendBox">
                    <input className="sendInput" type="text" placeholder="send message"
                        value={messageDraft} onChange={(event) => this.setState({messageDraft: event.target.value})}/>
                    <button className="sendButton" onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        </div>);
    }

}

export default ChatState3;