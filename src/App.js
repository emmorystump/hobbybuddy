import './App.css';
import Homepage from './homepage/homepage';
import Profile from './ProfilePage/Profile';
import Login from './LoginPage/Login';
import CreatePostForm from './createPostPage/createPostForm';
import Post from './homepage/posts-wrapper/post/post'
import firebase from "firebase/app";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Component } from 'react';
import SignupWrapper from './signup/signupWrapper';
import RequestHobbyForm from './requestNewHobbyPage/requestHobbyForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    // firebase.auth().signInWithEmailAndPassword('tomriddle@nowhere.com', 'eightone')
    // .then((user) => {
    //   console.log('sign in success')
    // })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }

  // https://stackoverflow.com/questions/56828703/only-display-component-for-some-routes-react 
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/createpost">
              <CreatePostForm />
            </Route>
            <Route exact path="/requestHobby">
              <RequestHobbyForm />
            </Route>
            <Route exact path="/signup">
              <SignupWrapper />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/login" exact component={Login}/>
            {/* <Route exact path="/postdetail">
              <Homepage />
            </Route> */}
          </Switch>
        </Router>
    );
  }
}

export default App;
