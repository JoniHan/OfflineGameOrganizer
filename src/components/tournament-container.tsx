import * as React from 'react';
import { ITournamentProps } from '../views/challonge-connection-view';

interface ITournamentContainerProps {
    tournament: any;
}

export const TournamentContainer: React.FC<ITournamentContainerProps> = (props) => {
    return (
        <>
            <h3>{props.tournament.tournament.name}</h3>
        </>
    );
}

export default TournamentContainer;