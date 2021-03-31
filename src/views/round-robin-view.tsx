import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/button';
import { Input } from '../components/input';
import MatchContainerGroup from '../components/match-container-group';
import PoolInputGroup from '../components/pool-input-group';
import PoolContext from '../context/pool';
import { roundRobinMatches } from '../utils/roundrobin';

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`;


export const RoundRobinView = () => {
    const [stationCount, setStationCount] = React.useState(0);
    const [poolCount, setPoolCount] = React.useState(0);
    const [stationMatches, setStationMatches] = React.useState([['']]);
    const poolContext = React.useContext(PoolContext);

    return (
        <>
            <TitleWrapper>
                <h1>Round Robin scheduler</h1>
                <p>Fill in the fields and press calculate to schedule games for each station</p>
            </TitleWrapper>
            <div className={'form-group'}>
                <div className={'col-md-12'}>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <Input
                                className={'form-control'}
                                onChange={
                                    (event) => {
                                        setStationCount(event.target.valueAsNumber);
                                    }
                                }
                                type={'number'}
                                labelText={'Station count'}
                            />
                        </div>
                        <div className={'col-md-6'}>
                            <Input
                                className={'form-control'}
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
                                labelText={'Pool count'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className={'form-group'}>
                <div className={'col-md-12'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <TitleWrapper>
                                <h2>Only fill in participant names, separated with a comma (,)</h2>
                            </TitleWrapper>
                        </div>
                        <PoolInputGroup count={poolCount} />
                        <ButtonWrapper className={'col-md-12'}>
                            <Button disabled={(stationCount > 0 && poolCount > 0) ? false : true} className={'btn btn-primary form-control'} onClick={
                                () => {
                                    const stationMatchesArray: string[][] = [];
                                    for (let i = 0; i < stationCount; i++) {
                                        stationMatchesArray.push([]);
                                    };
                                    const matches = roundRobinMatches(poolContext.pools);
                                    let stationId = 0;
                                    matches.forEach((match: string[]) => {
                                        const p1 = match[0].trim();
                                        const p2 = match[1].trim();

                                        if (!p1.length || !p2.length) {
                                            return;
                                        }

                                        if (stationId === stationCount) {
                                            stationId = 0;
                                        }
                                        stationMatchesArray[stationId].push(`${match[0]} VS. ${match[1]}`);
                                        stationId++;
                                    });
                                    setStationMatches(stationMatchesArray);
                                }}>
                                {'Calculate'}
                            </Button>
                        </ButtonWrapper>
                    </div>
                </div>
            </div>
            <hr />
            <div className={'col-md-12'}>
                <div className={'row'}>
                    <MatchContainerGroup matchesPerStation={stationMatches} />
                </div>
            </div>
        </>
    );
}

export default RoundRobinView;
