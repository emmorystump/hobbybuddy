import './App.css';
import Homepage from './homepage/homepage';
import CreatePostForm from './createPostPage/createPostForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
          
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

export default App;
