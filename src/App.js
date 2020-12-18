import './App.css';
import Homepage from './homepage/homepage';
import Profile from './ProfilePage/Profile';
import Login from './LoginPage/Login';
import CreatePostForm from './createPostPage/createPostForm';
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

  // https://stackoverflow.com/questions/56828703/only-display-component-for-some-routes-react 
  render() {
    const AuthenticatedRoutes = () => {
      return (
        <div className="default">
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
        </div>
      )
    }
    return (
      <Router className="App">
        <Switch>
            <Route path="/login" exact component={Login}/>
            <Route component={AuthenticatedRoutes}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
