import * as React from 'react';
import styled from 'styled-components';

interface IMatchContainerProps {
    matches: string[];
    stationId: number;
}

export const MatchContainer: React.FC<IMatchContainerProps> = (props) => {
    const elementArray: JSX.Element[] = props.matches.map(
        (match, idx) => {
            return (<p key={idx}>{match}</p>);
        }
    );
    return (
        <div>
            <h2>{`Matches for station ${props.stationId}`}</h2>
            {elementArray}
        </div>
    );
}

export default MatchContainer;