import './App.css';
import Homepage from './homepage/homepage';
import Profile from './ProfilePage/Profile';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

  }

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/createpost">
              <CreatePostForm />
            </Route>
            <Route exact path="/signup">
              <SignupWrapper />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>
            {/* <Route exact path="/postdetail">
              <Homepage />
            </Route> */}
          </Switch>
        </Router>
    );
  }
}

export default App;
