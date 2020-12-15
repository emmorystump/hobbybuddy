import React, { Component } from 'react';
import ChatState1 from './chatState1';
import ChatState2 from './chatState2';
import ChatState3 from './chatState3';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import './chatWrapper.css';

class ChatWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curChatState: 1,
            chatlogs: [],
            curTarget: '',
            curTargetIndex: -1,
            userid: '',
        };
        this.StateChange = this.StateChange.bind(this);
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var userChatlogsRef = firebase.database().ref('Users/'+userid+"/Chatlogs");
                userChatlogsRef.on('value', (snapshot) =>{
                    const chatlogObjects = snapshot.val();
                    self.setState({
                        chatlogs: Object.keys(chatlogObjects).map(uid => chatlogObjects[uid]),
                        userid: userid
                    });
                });
            } else {
              alert("Sign in first");
            }
        });
    }

    StateChange(state, targetIndex) {
        if (targetIndex >= 0) {
            this.setState(prevState => ({
                curChatState: state,
                curTarget: prevState.chatlogs[targetIndex].Target,
                curTargetIndex: targetIndex
            }));
        } else {
            this.setState({curChatState: state});
        }
    }
    
    render() {
        let chatState;
        const {curChatState, chatlogs, curTarget, curTargetIndex, userid} = this.state;
        if (curChatState === 1) {
            chatState = <ChatState1 stateChange={this.StateChange} />;
        } else if (curChatState === 2) {
            let chatList = chatlogs.map(chatlog => chatlog.Target);
            chatState = <ChatState2 stateChange={this.StateChange} chatList={chatList}/>;
        } else {
            let messages = chatlogs[curTargetIndex].Messages;
            chatState = <ChatState3
                            stateChange={this.StateChange}
                            target={curTarget}
                            messages={messages}
                            userid={userid}
                            targetid={chatlogs[curTargetIndex].TargetId} />;
        }
        return (
            <div className="chatWrapper">
                {chatState}
            </div>   
        );
    }
}

export default ChatWrapper;