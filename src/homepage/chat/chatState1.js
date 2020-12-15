import React from 'react';
import chatlogo from './chatlogo.jpg';
import './chatState1.css';

const ChatState1 = ({
    stateChange
}) => {
    return <img className="chatlogo" src={chatlogo} onClick={() => stateChange(2, -1)} alt="Chat" />;
};

export default ChatState1;