import React from 'react';
import './signupWrapper.css';

const SignupState2 = ({
    availableHobbies,
    addHobbies,
    stateChange,
    finishSignup,
}) => {
    let availHobbyElements = availableHobbies.map((hobby,index) => {
        let availHobbyElement;
        if (hobby.selected) {
            availHobbyElement = 
                <button
                    key={hobby.name}
                    className='selectedHobby'
                    onClick={() => addHobbies(hobby.name,index,false)}
                    >
                    {hobby.name}
                </button>;
        } else {
            availHobbyElement = 
                <button
                    key={hobby.name}
                    className='unselectedHobby'
                    onClick={() => addHobbies(hobby.name,index,true)}
                    >
                    {hobby.name}
                </button>;
        }
        return availHobbyElement;
    });
    return (
    <div>
        <button onClick={() => stateChange(1)}>←</button>
        {availHobbyElements}
        <button onClick={() => finishSignup()}>Get Started!</button>
    </div>);
};

export default SignupState2;