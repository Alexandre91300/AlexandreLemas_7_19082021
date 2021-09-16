import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import './sass/main.scss';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Accueil from './screens/Accueil';
import NewPost from './screens/NewPost';

function App() {
  
  // Recharge le site toute les 24h
  setInterval(function(){
    document.location.reload();
  }, 86400 * 1000);

  return (
    <>
    <Router>
      <Switch>

        {/* Routes PROTEGE */}
        <ProtectedRoute path="/" exact component={Accueil}/>
        <ProtectedRoute path="/newPost" exact component={NewPost}/>

        {/* Routes LIBRE */}
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/" component={() => {return(<h1>ERREUR 404</h1>)}}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
