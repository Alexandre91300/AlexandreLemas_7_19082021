import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import './sass/Main.scss';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import NewPost from './screens/NewPost';
import Profil from './screens/Profil';
import ModifyPost from './screens/ModifyPost';
import Setting from './screens/Setting';

function App() {

  // Recharge le site toute les 24h
  setInterval(function () {
    document.location.reload();
  }, 86400 * 1000);

  return (
    <>
      <Router>
        <Switch>

          {/* Routes PROTEGES */}
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/newPost" exact component={NewPost} />
          <ProtectedRoute path="/modifyPost" exact component={ModifyPost} />
          <ProtectedRoute path="/profil" exact component={Profil} />
          <ProtectedRoute path="/setting" exact component={Setting} />

          {/* Routes LIBRES */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={() => <Redirect to='/' />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
