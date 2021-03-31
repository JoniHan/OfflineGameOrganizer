import React from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import PoolInputGroup from '../components/pool-input-group';
import PoolContext from '../context/pool';

export const RoundRobinView = () => {
    const [stationCount, setStationCount] = React.useState(0);
    const [poolCount, setPoolCount] = React.useState(0);
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
                    return;
                }}>
                {'Calculate'}
            </Button>
        </>
    );
}

export default RoundRobinView;
