import './App.css';
import Homepage from './homepage/homepage';
import Profile from './ProfilePage/Profile';
import CreatePostForm from './createPostPage/createPostForm';
import Post from './homepage/posts-wrapper/post/post'
import Navbar from './components/Navbar';
import firebase from "firebase/app";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  componentDidMount() {
    firebase.auth().signInWithEmailAndPassword('tomriddle@nowhere.com', 'eightone')
    .then((user) => {
        console.log("succeed");
        console.log(user.user.email);
        this.setState({
          email: user.user.email,
          uid: user.user.uid
        })
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode+";"+errorMessage)
    });
  }

  render() {
    return (
        <Router>
          <Navbar email={this.state.email} />
          <Switch>
            <Route exact path="/profile" component={Profile}></Route>
            
            <Route exact path="/createpost">
              <CreatePostForm />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
    );
  }
}

export default App;
