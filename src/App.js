import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AutenticatedRoute from './misc/AutenticatedRoute';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <AutenticatedRoute exact path='/home'>
          <Home />
        </AutenticatedRoute>
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
