import * as React from 'react';
import styled from 'styled-components';

interface IMatchContainerProps {
    matches: string[];
    stationId: number;
}

const Div = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

export const MatchContainer: React.FC<IMatchContainerProps> = (props) => {
    const elementArray: JSX.Element[] = props.matches.map(
        (match, idx) => {
            return (<p key={idx}>{match}</p>);
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