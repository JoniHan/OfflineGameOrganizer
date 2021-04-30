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
    justify-content: space-round;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    border: solid 1px rgba(164,164,164,0.58);
    box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -webkit-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -moz-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
`;

const MatchContainerWrapperInProgress = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-round;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    background-color: rgba(63, 191, 63, 0.37);
    border: solid 1px rgba(164,164,164,0.58);
    box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -webkit-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
    -moz-box-shadow: 4px 4px 8px 0px rgba(164,164,164,0.58);
`;

const MatchContainerWrapperCompleted = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-round;
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

export const MatchContainer: React.FC<IMatchContainerProps> = (props) => {
    
    const matchContext = React.useContext(MatchContext);

    const elementArray: JSX.Element[] = props.matches.map(
        (match, idx) => {
            if (matchContext.completedMatches.indexOf(match.matchId) > -1) {
                return (
                    <MatchContainerWrapperCompleted key={idx}>
                        <p>{match.matchCaption}</p>
                        <Button
                            className={'btn btn-primary btn-sm'}
                            onClick={
                                () => {
                                    // TODO: FIX ME SO THAT EVERY STATION WORKS WORKS, NOT ONLY THE LAST ONE OR WITH TWO STATIONS
                                    // TODO: Cleaner rendering cycle
                                    matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                                    const p1Index = matchContext.occupants.indexOf(match.p1Id);
                                    const p2Index = matchContext.occupants.indexOf(match.p2Id);
                                    const stationIndex = matchContext.occupiedStations.indexOf(props.stationId - 1);
                                    const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);

                                    const occupantsRemovedArray = matchContext.occupants;
                                    const occupiedStationRemovedArray = matchContext.occupiedStations;
                                    const ongoingMatchesRemovedArray = matchContext.ongoingMatches;

                                    
                                    
                                    if (ongoingMatchIndex > -1) {
                                        ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                        if (p1Index > -1) {
                                            occupantsRemovedArray.splice(p1Index, 1);
                                        }
                                        
                                        if (p2Index > -1) {
                                            occupantsRemovedArray.splice(p2Index, 1);
                                        }
                                        if (stationIndex > -1) {
                                            occupiedStationRemovedArray.splice(stationIndex, 1);
                                        }
                                    }
                                    

                                    matchContext.setOccupants([...occupantsRemovedArray]);
                                    matchContext.setOccupiedStations([...occupiedStationRemovedArray]);
                                    matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);

                                    const stationIndexNew = matchContext.occupiedStations.indexOf(props.stationId - 1);
                                    if (stationIndexNew === -1) {
                                        // station cleared, find a new match for the station
                                        props.matches.forEach((match: IStationMatch) => {
                                            const p1IndexNew = matchContext.occupants.indexOf(match.p1Id);
                                            const p2IndexNew = matchContext.occupants.indexOf(match.p2Id);
                                            const ongoingMatchIndexNew = matchContext.ongoingMatches.indexOf(match.matchId);
    
                                            if (p1IndexNew === -1 && p2IndexNew === -1 && stationIndexNew === -1 && ongoingMatchIndexNew === -1) {
                                                matchContext.setOccupiedStations([...matchContext.occupiedStations, props.stationId - 1]);
                                                matchContext.setOccupants([...matchContext.occupants, match.p1Id, match.p2Id]);
                                                matchContext.setOngoingMatches([...matchContext.ongoingMatches, match.matchId]);
                                            }
                                        });
                                    }
                                }
                            }
                            disabled={matchContext.completedMatches.indexOf(match.matchId) > -1}
                        >
                            {matchContext.completedMatches.indexOf(match.matchId) > -1 ? 'Match completed' : 'Complete match' }
                        </Button>
                    </MatchContainerWrapperCompleted>
                );
            } else if (matchContext.ongoingMatches.indexOf(match.matchId) > -1) {
                return (
                    <MatchContainerWrapperInProgress key={idx}>
                        <p>{match.matchCaption}</p>
                        <Button
                            className={'btn btn-primary btn-sm'}
                            onClick={
                                () => {
                                    matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                                    const p1Index = matchContext.occupants.indexOf(match.p1Id);
                                    const p2Index = matchContext.occupants.indexOf(match.p2Id);
                                    const stationIndex = matchContext.occupiedStations.indexOf(props.stationId - 1);
                                    const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);

                                    const occupantsRemovedArray = matchContext.occupants;
                                    const occupiedStationRemovedArray = matchContext.occupiedStations;
                                    const ongoingMatchesRemovedArray = matchContext.ongoingMatches;

                                    
                                    
                                    if (ongoingMatchIndex > -1) {
                                        ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                        if (p1Index > -1) {
                                            occupantsRemovedArray.splice(p1Index, 1);
                                        }
                                        
                                        if (p2Index > -1) {
                                            occupantsRemovedArray.splice(p2Index, 1);
                                        }
                                        if (stationIndex > -1) {
                                            occupiedStationRemovedArray.splice(stationIndex, 1);
                                        }
                                    }
                                    

                                    matchContext.setOccupants([...occupantsRemovedArray]);
                                    matchContext.setOccupiedStations([...occupiedStationRemovedArray]);
                                    matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);

                                    const stationIndexNew = matchContext.occupiedStations.indexOf(props.stationId - 1);
                                    if (stationIndexNew === -1) {
                                        // station cleared, find a new match for the station
                                        props.matches.forEach((match: IStationMatch) => {
                                            const p1IndexNew = matchContext.occupants.indexOf(match.p1Id);
                                            const p2IndexNew = matchContext.occupants.indexOf(match.p2Id);
                                            const ongoingMatchIndexNew = matchContext.ongoingMatches.indexOf(match.matchId);
    
                                            if (p1IndexNew === -1 && p2IndexNew === -1 && stationIndexNew === -1 && ongoingMatchIndexNew === -1) {
                                                matchContext.setOccupiedStations([...matchContext.occupiedStations, props.stationId - 1]);
                                                matchContext.setOccupants([...matchContext.occupants, match.p1Id, match.p2Id]);
                                                matchContext.setOngoingMatches([...matchContext.ongoingMatches, match.matchId]);
                                            }
                                        });
                                    }
                                }
                            }
                            disabled={matchContext.completedMatches.indexOf(match.matchId) > -1}
                        >
                            {matchContext.completedMatches.indexOf(match.matchId) > -1 ? 'Match completed' : 'Complete match' }
                        </Button>
                    </MatchContainerWrapperInProgress>
                );
            }

            return (
                <MatchContainerWrapperNormal key={idx}>
                    <p>{match.matchCaption}</p>
                    <Button
                        className={'btn btn-primary btn-sm'}
                        onClick={
                            () => {
                                matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                                const p1Index = matchContext.occupants.indexOf(match.p1Id);
                                const p2Index = matchContext.occupants.indexOf(match.p2Id);
                                const stationIndex = matchContext.occupiedStations.indexOf(props.stationId - 1);
                                const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);

                                const occupantsRemovedArray = matchContext.occupants;
                                const occupiedStationRemovedArray = matchContext.occupiedStations;
                                const ongoingMatchesRemovedArray = matchContext.ongoingMatches;

                                
                                
                                if (ongoingMatchIndex > -1) {
                                    ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                    if (p1Index > -1) {
                                        occupantsRemovedArray.splice(p1Index, 1);
                                    }
                                    
                                    if (p2Index > -1) {
                                        occupantsRemovedArray.splice(p2Index, 1);
                                    }
                                    if (stationIndex > -1) {
                                        occupiedStationRemovedArray.splice(stationIndex, 1);
                                    }
                                }
                                

                                matchContext.setOccupants([...occupantsRemovedArray]);
                                matchContext.setOccupiedStations([...occupiedStationRemovedArray]);
                                matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);

                                const stationIndexNew = matchContext.occupiedStations.indexOf(props.stationId - 1);
                                if (stationIndexNew === -1) {
                                    // station cleared, find a new match for the station
                                    props.matches.forEach((match: IStationMatch) => {
                                        const p1IndexNew = matchContext.occupants.indexOf(match.p1Id);
                                        const p2IndexNew = matchContext.occupants.indexOf(match.p2Id);
                                        const ongoingMatchIndexNew = matchContext.ongoingMatches.indexOf(match.matchId);

                                        if (p1IndexNew === -1 && p2IndexNew === -1 && stationIndexNew === -1 && ongoingMatchIndexNew === -1) {
                                            matchContext.setOccupiedStations([...matchContext.occupiedStations, props.stationId - 1]);
                                            matchContext.setOccupants([...matchContext.occupants, match.p1Id, match.p2Id]);
                                            matchContext.setOngoingMatches([...matchContext.ongoingMatches, match.matchId]);
                                        }
                                    });
                                }
                            }
                        }
                        disabled={matchContext.completedMatches.indexOf(match.matchId) > -1}
                    >
                        {matchContext.completedMatches.indexOf(match.matchId) > -1 ? 'Match completed' : 'Complete match' }
                    </Button>
                </MatchContainerWrapperNormal>
            );
        }
    );
    return (
        <Div>
            <h3>{`Matches for station ${props.stationId}`}</h3>
            {elementArray}
        </Div>
    );
}

export default MatchContainer;