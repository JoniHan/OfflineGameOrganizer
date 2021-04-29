import { v4 as uuidv4 } from 'uuid';
import { IPlayerInfo } from '../views/round-robin-view';
var robin = require('roundrobin');

export const roundRobinMatches = (pools: string[]) => {
    const matchesPerPool = pools.map(pool => {
        const singlePool = pool.split(',');
        const matchesSinglePool = robin(singlePool.length, singlePool);
        return matchesSinglePool;
    });
    const allRRMatches = allMatches(matchesPerPool);
    return allRRMatches;
};

export const allMatches = (pools: [][][]) => {
    const matchArray: IPlayerInfo[][] = [];
    pools.forEach(pool => {
        pool.forEach(round => {
            round.forEach(match => {
                const p1: IPlayerInfo = {id: uuidv4(), name: match[0]}
                const p2: IPlayerInfo = {id: uuidv4(), name: match[1]}
                const playerArray: IPlayerInfo[] = [p1, p2];
                matchArray.push(playerArray);
            });
        });
    });
    return matchArray;
};