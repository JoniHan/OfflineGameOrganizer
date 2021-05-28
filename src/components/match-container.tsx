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
                                    matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                                    const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);
                                    const ongoingMatchesRemovedArray = matchContext.ongoingMatches;

                                    if (ongoingMatchIndex > -1) {
                                        ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                    }
                                    
                                    matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);
                                }
                            }
                            disabled={matchContext.completedMatches.indexOf(match.matchId) > -1}
                        >
                            {matchContext.completedMatches.indexOf(match.matchId) > -1 ? 'Match completed' : 'Complete match' }
                        </Button>
                    </MatchContainerWrapperCompleted>
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
                                    const ongoingMatchIndex = matchContext.ongoingMatches.indexOf(match.matchId);
                                    const ongoingMatchesRemovedArray = matchContext.ongoingMatches;
                                    
                                    if (ongoingMatchIndex > -1) {
                                        ongoingMatchesRemovedArray.splice(ongoingMatchIndex, 1);
                                    }
                                    
                                    matchContext.setOngoingMatches([...ongoingMatchesRemovedArray]);
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