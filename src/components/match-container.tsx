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
    justify-content: center;
`;

export const MatchContainer: React.FC<IMatchContainerProps> = (props) => {
    
    const matchContext = React.useContext(MatchContext);

    const elementArray: JSX.Element[] = props.matches.map(
        (match, idx) => {
            return (
                <Div key={idx}>
                    <p>{match.matchCaption}</p>
                    <Button
                        onClick={
                            () => {
                                matchContext.setCompletedMatches([...matchContext.completedMatches, match.matchId]);
                            }
                        }
                        disabled={matchContext.completedMatches.indexOf(match.matchId) > -1}
                    >
                        {matchContext.completedMatches.indexOf(match.matchId) > -1 ? 'Match completed' : 'Complete match' }
                    </Button>
                </Div>
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