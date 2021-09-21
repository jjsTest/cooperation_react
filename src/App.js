import './App.css';
import {Link,Route,Switch, Router} from 'react-router-dom';
import BoardRoom from './BoardRoom';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/community" component={Community} />
          <Route path="/chat" component={Chat} /> */}
          <Route path="/boardRoom" component={BoardRoom} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
