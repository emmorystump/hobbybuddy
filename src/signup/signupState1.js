import React from 'react';
import './signupState2.css';

const SignupState1 = ({
    email,
    username,
    password,
    updateEmail,
    updateUsername,
    updatePassword,
    stateChange,
}) => (
    <div>
        <div>Email:</div>
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => updateEmail(event.target.value)}
        />
        <div>Username:</div>
        <input
            type="text"
            placeholder="New Username"
            value={username}
            onChange={(event) => updateUsername(event.target.value)}
        />
        <div>Password:</div>
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => updatePassword(event.target.value)}
        />
        <button onClick={() => stateChange(2)}>Next</button>
    </div>
);

export default SignupState1;