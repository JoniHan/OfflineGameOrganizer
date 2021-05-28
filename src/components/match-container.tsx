import * as React from 'react';
import styled from 'styled-components';
import MatchContext from '../context/match';
import { IStationMatch } from '../views/round-robin-view';
import Button from './button';

interface IMatchContainerProps {
    matches: IStationMatch[];
    stationId: number;
}

const Div = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-round;
`;

const MatchContainerWrapperNormal = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    border: solid 1px rgba(164,164,164,0.58);
    box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -webkit-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -moz-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
`;

const MatchContainerWrapperOngoing = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    background-color: rgba(255, 162, 0, 0.46);
    border: solid 1px rgba(164,164,164,0.58);
    box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -webkit-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -moz-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
`;

const MatchContainerWrapperCompleted = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    background-color: rgba(63, 63, 191, 0.37);
    border: solid 1px rgba(164,164,164,0.58);
    box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -webkit-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -moz-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
`;

const ButtonRowWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
`;

export const MatchContainer: React.FC<IMatchContainerProps> = (props) => {

    const matchContext = React.useContext(MatchContext);

    const elementArray: JSX.Element[] = props.matches.map(
        (match, idx) => {
            if (matchContext.completedMatches.indexOf(match.matchId) > -1) {
                return (
                    <MatchContainerWrapperCompleted key={idx}>
                        <b>Completed</b>
                        <p><s>{match.matchCaption}</s></p>
                        <ButtonRowWrapper>
                            <Button
                                className={'btn btn-primary btn-sm'}
                                onClick={
                                    () => {
                                        const completedMatchIndex = matchContext.completedMatches.indexOf(match.matchId);
                                        const completedMatchesRemovedArray = matchContext.completedMatches;
                                        completedMatchesRemovedArray.splice(completedMatchIndex, 1);
                                        matchContext.setCompletedMatches([...completedMatchesRemovedArray]);
                                    }
                                }
                            >
                                {'Undo completion'}
                            </Button>
                        </ButtonRowWrapper>
                    </MatchContainerWrapperCompleted>
                );
            }

            if (matchContext.ongoingMatches.indexOf(match.matchId) > -1) {
                return (
                    <MatchContainerWrapperOngoing key={idx}>
                        <b>Started</b>
                        <p>{match.matchCaption}</p>
                        <ButtonRowWrapper>
                            <Button
                                className={'btn btn-primary btn-sm'}
                                onClick={
                                    () => {
                                        const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);
                                        const ongoingMatchesRemovedArray = matchContext.ongoingMatches;
                                        ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                        matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);

                                        const occupiedStationIndex = matchContext.occupiedStations.indexOf(props.stationId);
                                        const occupiedStationsRemovedArray = matchContext.occupiedStations;
                                        occupiedStationsRemovedArray.splice(occupiedStationIndex, 1);
                                        matchContext.setOccupiedStations([...occupiedStationsRemovedArray]);

                                        const occupiedPlayersRemovedArray = matchContext.occupiedPlayers;
                                        const p1OccupiedIndex = matchContext.occupiedPlayers.indexOf(match.p1Id);
                                        occupiedPlayersRemovedArray.splice(p1OccupiedIndex, 1);
                                        const p2OccupiedIndex = matchContext.occupiedPlayers.indexOf(match.p2Id);
                                        occupiedPlayersRemovedArray.splice(p2OccupiedIndex, 1);
                                        matchContext.setOccupiedPlayers([...occupiedPlayersRemovedArray]);
                                    }
                                }
                            >
                                {'Undo start'}
                            </Button>
                            <Button
                                className={'btn btn-primary btn-sm'}
                                onClick={
                                    () => {
                                        matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                                        const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);
                                        const ongoingMatchesRemovedArray = matchContext.ongoingMatches;
                                        if (ongoingMatchIndex > -1) {
                                            ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                            matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);
                                        }

                                        const occupiedStationIndex = matchContext.occupiedStations.indexOf(props.stationId);
                                        const occupiedStationsRemovedArray = matchContext.occupiedStations;
                                        if (occupiedStationIndex > -1) {
                                            occupiedStationsRemovedArray.splice(occupiedStationIndex, 1);
                                            matchContext.setOccupiedStations([...occupiedStationsRemovedArray]);
                                        }

                                        const p1OccupiedIndex = matchContext.occupiedPlayers.indexOf(match.p1Id);
                                        const p2OccupiedIndex = matchContext.occupiedPlayers.indexOf(match.p2Id);
                                        const occupiedPlayersRemovedArray = matchContext.occupiedPlayers;
                                        if (p1OccupiedIndex > -1 || p2OccupiedIndex > -1) {
                                            if (p1OccupiedIndex > -1) {
                                                occupiedPlayersRemovedArray.splice(matchContext.occupiedPlayers.indexOf(match.p1Id), 1);
                                            }
                                            if (p2OccupiedIndex > -1) {
                                                occupiedPlayersRemovedArray.splice(matchContext.occupiedPlayers.indexOf(match.p2Id), 1);
                                            }
                                            matchContext.setOccupiedPlayers([...occupiedPlayersRemovedArray]);
                                        }
                                    }
                                }
                            >
                                {'Complete match'}
                            </Button>
                        </ButtonRowWrapper>
                    </MatchContainerWrapperOngoing>
                );
            }

            return (
                <MatchContainerWrapperNormal key={idx}>
                    <p>{match.matchCaption}</p>
                    <ButtonRowWrapper>
                        <Button
                            className={'btn btn-primary btn-sm'}
                            onClick={
                                () => {
                                    matchContext.setOngoingMatches([...matchContext.ongoingMatches, match.matchId]);
                                    matchContext.setOccupiedPlayers([...matchContext.occupiedPlayers, match.p1Id, match.p2Id]);
                                    matchContext.setOccupiedStations([...matchContext.occupiedStations, props.stationId]);
                                }
                            }
                            disabled={(matchContext.occupiedPlayers.indexOf(match.p1Id) > -1 || matchContext.occupiedPlayers.indexOf(match.p2Id) > -1 || matchContext.occupiedStations.indexOf(props.stationId) > -1) ? true : false}
                        >
                            {'Start match'}
                        </Button>
                        <Button
                            className={'btn btn-primary btn-sm'}
                            onClick={
                                () => {
                                    matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                                    const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);
                                    const ongoingMatchesRemovedArray = matchContext.ongoingMatches;

                                    if (ongoingMatchIndex > -1) {
                                        ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                    }

                                    matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);
                                }
                            }
                        >
                            {'Complete match'}
                        </Button>
                    </ButtonRowWrapper>
                </MatchContainerWrapperNormal>
            );
        }
    );
    return (
        <Div>
            <h3>{`Matches for station ${props.stationId + 1}`}</h3>
            {elementArray}
        </Div>
    );
}

export default MatchContainer;