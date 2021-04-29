import * as React from 'react';
import MatchContainer from './match-container';
import { IStationMatch } from '../views/round-robin-view';

interface IMatchContainerGroupProps {
    matchesPerStation: IStationMatch[][];
}


export const MatchContainerGroup: React.FC<IMatchContainerGroupProps> = (props) => {
    if (!props.matchesPerStation[0][0]) {
        return (<></>);
    }
    const elementArray: JSX.Element[] = props.matchesPerStation.map(
        (stationMatches, idx) => {
            return (
                <div className={'col-md-6'} key={idx}>
                    <MatchContainer matches={stationMatches} stationId={idx + 1}></MatchContainer>
                </div>
            )
        }
    );

    return <>{elementArray}</>;
}

export default MatchContainerGroup;