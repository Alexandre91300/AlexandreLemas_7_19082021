import './sass/main.scss';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={() => {return(<h1>Accueil</h1>)}}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/" component={() => {return(<h1>ERREUR 404</h1>)}}/>

      </Switch>
    </Router>
    </>
  );
}

export default App;
