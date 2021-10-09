import {Route} from 'react-router-dom';
import BoardRoom from './views/BoardRoom';
import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

function Routes() {
  return (
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/boardRoom/:boardId" component={BoardRoom} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          {/* <Route path="/community" component={Community} />
          <Route path="/chat" component={Chat} /> */}
      </div>
  );
}

export default Routes;
