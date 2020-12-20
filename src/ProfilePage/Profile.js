import React, { Component } from 'react';
import PageLoader from '../components/PageLoader';
import ProfileDetails from './ProfileDetalis';
import { withRouter } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: "",
            hobbies: [],
            uid: ""
        };
    }

    componentDidMount() {
        let self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let uid = user.uid;
                let userInfo = firebase.database().ref('Users/'+uid);
                userInfo.on('value', (snapshot) =>{
                    let user =  snapshot.val();
                    self.setState({
                        username: user.Username,
                        hobbies: user.Hobbies,
                        uid: uid,
                        loading: true
                    })
                });
            } else {
                self.props.history.push('/login');
            }
        });
    }

    render() {
        let allPage;
        this.state.loading ? (
            allPage = <ProfileDetails username={this.state.username} hobbies={this.state.hobbies}  uid={this.state.uid}/> 
        ) : (
            allPage = <PageLoader />
        )

        return (
            <div>
                {allPage}
            </div>
        );
    }
}

export default withRouter(Profile);