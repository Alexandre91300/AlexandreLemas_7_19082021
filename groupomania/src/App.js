import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import './sass/main.scss';

import Login from './screens/Login';
import SignUp from './screens/SignUp';

function App() {
  
  // Recharge le site toute les 24h
  setInterval(function(){
    document.location.reload();
  }, 86400 * 1000);

  return (
    <>
    <Router>
      <Switch>
        <ProtectedRoute path="/" exact component={() => {return(<h1>Accueil</h1>)}} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/" component={() => {return(<h1>ERREUR 404</h1>)}}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
