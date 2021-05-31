import * as React from 'react';
import { ITournamentProps } from '../views/challonge-connection-view';
import styled from 'styled-components';
import TournamentContainer from './tournament-container';

interface ITournamentContaierGroupProps {
    tournaments: any[];
}

const Container = styled.div`
padding-top: 25px;
padding-bottom: 25px;
`;

export const TournamentContainerGroup: React.FC<ITournamentContaierGroupProps> = (props) => {
    if (!props.tournaments[0]) {
        return (<></>);
    }
    const elementArray: JSX.Element[] = props.tournaments.map(
        (tournament, idx) => {
            return (
                <Container className={'col-md-6'} key={idx}>
                    <TournamentContainer tournament={tournament}></TournamentContainer>
                </Container>
            )
        }
    );

    return <>{elementArray}</>;
}

export default TournamentContainerGroup;