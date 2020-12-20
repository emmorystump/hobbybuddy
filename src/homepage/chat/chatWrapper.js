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
            predefinedTarget: this.props.predefinedTarget,
        };
        this.StateChange = this.StateChange.bind(this);
        this.SearchUser = this.SearchUser.bind(this);
        this.StateChangeWithDataRefresh = this.StateChangeWithDataRefresh.bind(this);
        this.BlockUser = this.BlockUser.bind(this);
    }

    componentDidMount() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let userid = user.uid;
                var userChatlogsRef = firebase.database().ref('Users/'+userid+"/Chatlogs");
                userChatlogsRef.once('value', (snapshot) =>{
                    const chatlogObjects = snapshot.val();
                    if (chatlogObjects) {
                        self.setState({
                            chatlogs: Object.keys(chatlogObjects).map(uid => chatlogObjects[uid]),
                        });
                    }
                });
            } else {
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
                var messagesRef = database.ref('Users/'+self.props.userid+"/Chatlogs/"+targetid);
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

    BlockUser(index) {
        var self = this;
        let chatlog = self.state.chatlogs[index];
        let database = firebase.database();
        var chatlogRef = database.ref('Users/'+self.props.userid+"/Chatlogs/"+chatlog.TargetId);
        console.log('Users/'+self.props.userid+"/Chatlogs");
        chatlogRef.remove();
        let newChatlogs = [...self.state.chatlogs];
        newChatlogs.splice(index, 1);
        self.setState({
            chatlogs: newChatlogs
        });
    }

    StateChangeWithDataRefresh(state) {
        var self = this;
        let userid = self.props.userid;
        var userChatlogsRef = firebase.database().ref('Users/'+userid+"/Chatlogs");
        userChatlogsRef.once('value', (snapshot) =>{
            const chatlogObjects = snapshot.val();
            if (chatlogObjects) {
                self.setState({
                    curChatState: state,
                    chatlogs: Object.keys(chatlogObjects).map(uid => chatlogObjects[uid]),
                    userid: userid
                });
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
        if (this.state.predefinedTarget !== this.props.predefinedTarget) {
            this.SearchUser(this.props.predefinedTarget);
            this.setState({
                predefinedTarget: this.props.predefinedTarget
            })
        }
        let chatState;
        const {curChatState, chatlogs, curTarget, curTargetIndex} = this.state;
        if (curChatState === 1) {
            chatState = <ChatState1 stateChange={this.StateChange} />;
        } else if (curChatState === 2) {
            let chatList = chatlogs.map(chatlog => chatlog.Target);
            console.log(chatlogs);
            chatState = <ChatState2
                            stateChange={this.StateChange}
                            chatList={chatList}
                            searchUser={this.SearchUser}
                            blockUser = {this.BlockUser} />;
        } else {
            let messages = chatlogs[curTargetIndex].Messages;
            if (messages === undefined) messages = [];
            chatState = <ChatState3
                            stateChange={this.StateChangeWithDataRefresh}
                            target={curTarget}
                            messages={messages}
                            userid={this.props.userid}
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