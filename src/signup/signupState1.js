import React from 'react';
import './signupState1.css';

const SignupState1 = ({
    email,
    username,
    password,
    updateEmail,
    updateUsername,
    updatePassword,
    stateChange,
}) => (
    <div className="signupForm">
        <div className="signuInputWrapper">
            <div>Email:</div>
            <input
                className = "input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => updateEmail(event.target.value)}
            />
        </div>
        <div className="signuInputWrapper">
            <div>Username:</div>
            <input
                className = "input"
                type="text"
                placeholder="New Username"
                value={username}
                onChange={(event) => updateUsername(event.target.value)}
            />
        </div>
        <div className="signuInputWrapper">
            <div>Password:</div>
            <input
                className = "input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => updatePassword(event.target.value)}
            />
        </div>
        <button className="nextButton" onClick={() => stateChange(2)}>Next</button>
    </div>
);

export default SignupState1;