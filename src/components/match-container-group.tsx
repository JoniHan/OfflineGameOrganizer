import * as React from 'react';
import MatchContainer from './match-container';
import { IStationMatch } from '../views/round-robin-view';
import styled from 'styled-components';

interface IMatchContainerGroupProps {
    matchesPerStation: IStationMatch[][];
}

const Container = styled.div`
padding-top: 25px;
padding-bottom: 25px;
`;

export const MatchContainerGroup: React.FC<IMatchContainerGroupProps> = (props) => {
    if (!props.matchesPerStation[0][0]) {
        return (<></>);
    }
    const elementArray: JSX.Element[] = props.matchesPerStation.map(
        (stationMatches, idx) => {
            return (
                <Container className={'col-md-6'} key={idx}>
                    <MatchContainer matches={stationMatches} stationId={idx}></MatchContainer>
                </Container>
            )
        }
    );

    return <>{elementArray}</>;
}

export default MatchContainerGroup;