import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '../components/button';
import { PoolProvider } from '../context/pool';
import HomeView from './home-view';
import RoundRobinView from './round-robin-view';

export const MainView = () => {
  return (
    <>
      <Router>
        <Button>
          <Link to="/">Home</Link>
        </Button>
        <Button>
          <Link to="/roundrobin">Round robin scheduler</Link>
        </Button>
        <hr />
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/roundrobin">
            <PoolProvider>
              <RoundRobinView />
            </PoolProvider>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default MainView;
