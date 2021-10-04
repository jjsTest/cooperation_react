import {Route} from 'react-router-dom';
import BoardRoom from './BoardRoom';
import Home from './Home';

function Routes() {
  return (
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/boardRoom/:boardId" component={BoardRoom} />
          {/* <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/community" component={Community} />
          <Route path="/chat" component={Chat} /> */}
      </div>
  );
}

export default Routes;
