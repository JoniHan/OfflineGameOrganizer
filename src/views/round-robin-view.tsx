import React from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import MatchContainerGroup from '../components/match-container-group';
import PoolInputGroup from '../components/pool-input-group';
import PoolContext from '../context/pool';
import { roundRobinMatches } from '../utils/roundrobin';

export const RoundRobinView = () => {
    const [stationCount, setStationCount] = React.useState(0);
    const [poolCount, setPoolCount] = React.useState(0);
    const [stationMatches, setStationMatches] = React.useState([['']]);
    const poolContext = React.useContext(PoolContext);

    return (
        <>
            <h1>Round Robin scheduler</h1>
            <p>Fill in the fields and press calculate to schedule games for each station</p>
            <Input
                onChange={
                    (event) => {
                        setStationCount(event.target.valueAsNumber);
                        console.log(event.target.valueAsNumber);
                    }
                }
                type={'number'}
                labelText={'Station count'}
            />
            <Input
                onChange={
                    (event) => {
                        const count = event.target.valueAsNumber;
                        setPoolCount(event.target.valueAsNumber);
                        const poolArray = [];
                        for (let i = 0; i < count; i++) {
                            poolArray.push('');
                        }
                        poolContext.setPools(poolArray);
                    }
                }
                type={'number'}
                labelText={'pool count'}
            />
            <hr />
            <PoolInputGroup count={poolCount} />
            <Button onClick={
                () => {
                    const stationMatchesArray: string[][] = [];
                    for (let i = 0; i < stationCount; i++) {
                        stationMatchesArray.push([]);
                    };
                    const matches = roundRobinMatches(poolContext.pools);
                    let stationId = 0;
                    matches.forEach((match: string[]) => {
                        console.log()
                        if (stationId === stationCount) {
                            stationId = 0;
                        }
                        stationMatchesArray[stationId].push(`${match[0]} VS. ${match[1]}`);
                        stationId++;
                    });
                    setStationMatches(stationMatchesArray);
                    console.log(stationMatches);
                }}>
                {'Calculate'}
            </Button>
            <hr />
            <MatchContainerGroup matchesPerStation={stationMatches} />
        </>
    );
}

export default RoundRobinView;
