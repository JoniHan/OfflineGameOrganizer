import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import { Button } from '../components/button';
import { MatchProvider } from '../context/match';
import { PoolProvider } from '../context/pool';
import ChallongeConnectionView from './challonge-connection-view';
import HomeView from './home-view';
import RoundRobinView from './round-robin-view';

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;
export const MainView = () => {
  return (
    <>
      <Router>
        <BtnWrapper>
          <Link to="/"><Button className={'btn btn-primary btn-xs ml-3 mt-3'}>Home</Button></Link>
          <Link to="/roundrobin"><Button className={'btn btn-primary btn-xs ml-3 mt-3'}>Round robin scheduler</Button></Link>
          <Link to="/challongeconnectionview"><Button className={'btn btn-primary btn-xs ml-3 mt-3'}>Challonge API</Button></Link>
        </BtnWrapper>
        <hr />
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/roundrobin">
            <PoolProvider>
              <MatchProvider>
                <RoundRobinView />
              </MatchProvider>
            </PoolProvider>
          </Route>
          <Route path="/challongeconnectionview">
            <PoolProvider>
              <MatchProvider>
                <ChallongeConnectionView />
              </MatchProvider>
            </PoolProvider>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default MainView;
