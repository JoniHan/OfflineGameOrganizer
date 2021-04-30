import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/button';
import { Input } from '../components/input';
import MatchContainerGroup from '../components/match-container-group';
import PoolInputGroup from '../components/pool-input-group';
import PoolContext from '../context/pool';
import { roundRobinMatches } from '../utils/roundrobin';
import { v4 as uuidv4 } from 'uuid';
import MatchContext from '../context/match';

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`;

export interface IPlayerInfo {
    id: string;
    name: string;
};

export interface IStationMatch {
    matchId: string;
    p1Id: string;
    p2Id: string;
    matchCaption: string;
};

export const RoundRobinView = () => {
    const [stationCount, setStationCount] = React.useState(0);
    const [poolCount, setPoolCount] = React.useState(0);
    const [stationMatches, setStationMatches] = React.useState([[]] as IStationMatch[][]);
    const poolContext = React.useContext(PoolContext);
    const matchContext = React.useContext(MatchContext);

    return (
        <>
            <TitleWrapper>
                <h1>Round Robin scheduler</h1>
                <p>Fill in the fields and press calculate to schedule games for each station</p>
            </TitleWrapper>
            <div className={'form-group'}>
                <div className={'col-md-12'}>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <Input
                                className={'form-control'}
                                onChange={
                                    (event) => {
                                        setStationCount(event.target.valueAsNumber);
                                    }
                                }
                                type={'number'}
                                labelText={'Station count'}
                            />
                        </div>
                        <div className={'col-md-6'}>
                            <Input
                                className={'form-control'}
                                onChange={
                                    (event) => {
                                        const count = event.target.valueAsNumber;
                                        setPoolCount(event.target.valueAsNumber);
                                        const poolArray = [];
                                        for (let i = 0; i < count; i++) {
                                            poolArray.push('');
                                        }
                                        poolContext.setPools(poolArray);
                                    }
                                }
                                type={'number'}
                                labelText={'Pool count'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className={'form-group'}>
                <div className={'col-md-12'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <TitleWrapper>
                                <h2>Only fill in participant names, separated with a comma (,)</h2>
                            </TitleWrapper>
                        </div>
                        <PoolInputGroup count={poolCount} />
                        <ButtonWrapper className={'col-md-12'}>
                            <Button disabled={(stationCount > 0 && poolCount > 0) ? false : true} className={'btn btn-primary form-control'} onClick={
                                () => {
                                    const stationMatchesArray: IStationMatch[][] = [];
                                    for (let i = 0; i < stationCount; i++) {
                                        stationMatchesArray.push([]);
                                    };
                                    const matches = roundRobinMatches(poolContext.pools);
                                    let stationId = 0;
                                    let occupiedStationsArray: number[] = [];
                                    let occupantsArray: string[] = [];
                                    let OngoingMatchesArray: string[] = [];
                                    matches.forEach((players: IPlayerInfo[]) => {
                                        const p1 = players[0].name.trim();
                                        const p2 = players[1].name.trim();

                                        if (!p1.length || !p2.length) {
                                            return;
                                        }

                                        if (stationId === stationCount) {
                                            stationId = 0;
                                        }
                                        const matchObject: IStationMatch = {matchId: uuidv4(), p1Id: players[0].id, p2Id: players[1].id, matchCaption: `${p1} VS. ${p2}`};
                                        stationMatchesArray[stationId].push(matchObject);

                                        if (OngoingMatchesArray.indexOf(matchObject.matchId) === -1 && occupiedStationsArray.indexOf(stationId) === -1 && occupantsArray.indexOf(players[0].id) === -1 && matchContext.occupants.indexOf(players[1].id) === -1) {
                                                // setup not reserved, players not playing, match not ongoing, fix a game
                                                occupiedStationsArray.push(stationId);
                                                occupantsArray.push(players[0].id);
                                                occupantsArray.push(players[1].id);
                                                OngoingMatchesArray.push(matchObject.matchId);
                                            }
                                            
                                            stationId++;
                                        });
                                        matchContext.setOccupiedStations([...matchContext.occupiedStations, ...occupiedStationsArray]);
                                        matchContext.setOccupants([...matchContext.occupants, ...occupantsArray]);
                                        matchContext.setOngoingMatches([...matchContext.ongoingMatches, ...OngoingMatchesArray]);
                                    setStationMatches(stationMatchesArray);
                                }}>
                                {'Calculate'}
                            </Button>
                        </ButtonWrapper>
                    </div>
                </div>
            </div>
            <hr />
            <div className={'col-md-12'}>
                <div className={'row'}>
                    <MatchContainerGroup matchesPerStation={stationMatches} />
                </div>
            </div>
        </>
    );
}

export default RoundRobinView;
