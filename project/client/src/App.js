import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HousesList from './components/HousesList';
import HouseDetails from './components/HouseDetails';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Contribute from './components/ContributionForm';
import RenderError from './components/Error';
import './App.css';

const App = () => (
  <React-fragment>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/houses" component={HousesList} />
      <Route exact path="/houses/:id" component={HouseDetails} />
      <Route exact path="/contribute" component={Contribute} />
      <Route component={RenderError} />
    </Switch>
  </React-fragment>
);

export default App;
