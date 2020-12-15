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
        this.SearchUser = this.SearchUser.bind(this);
        this.StateChangeWithDataRefresh = this.StateChangeWithDataRefresh.bind(this);
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var userChatlogsRef = firebase.database().ref('Users/'+userid+"/Chatlogs");
                userChatlogsRef.once('value', (snapshot) =>{
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

    SearchUser(query) {
        var self = this;
        let filteredUsersRef = firebase.database().ref('Users/').orderByChild('Username').equalTo(query);
        filteredUsersRef.once('value', (snapshot) =>{
            const filteredUsers = snapshot.val();
            if (filteredUsers === null) {
                alert("There isn't a user with this name.");
            } else {
                let target = filteredUsers[Object.keys(filteredUsers)[0]].Username;
                let targetid = Object.keys(filteredUsers)[0];
                let newChat = {
                    Target: target,
                    TargetId: targetid,
                }
                let database = firebase.database();
                var messagesRef = database.ref('Users/'+self.state.userid+"/Chatlogs/"+targetid);
                messagesRef.set(newChat, (error) => {
                    if (error) {
                        alert("Due to server issues, search failed! Please try again later.");
                    } else {
                        self.setState(prevState => ({
                            curChatState: 3,
                            chatlogs: [...prevState.chatlogs, newChat],
                            curTarget: target,
                            curTargetIndex: prevState.chatlogs.length,
                        }));
                    }
                });
            }
            
        });
    }

    StateChangeWithDataRefresh(state) {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var userChatlogsRef = firebase.database().ref('Users/'+userid+"/Chatlogs");
                userChatlogsRef.once('value', (snapshot) =>{
                    const chatlogObjects = snapshot.val();
                    self.setState({
                        curChatState: state,
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
            chatState = <ChatState2
                            stateChange={this.StateChange}
                            chatList={chatList}
                            searchUser={this.SearchUser} />;
        } else {
            let messages = chatlogs[curTargetIndex].Messages;
            if (messages === undefined) messages = [];
            console.log(messages);
            chatState = <ChatState3
                            stateChange={this.StateChangeWithDataRefresh}
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