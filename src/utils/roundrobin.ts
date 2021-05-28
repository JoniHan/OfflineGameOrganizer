import { v4 as uuidv4 } from 'uuid';
import { IPlayerInfo } from '../views/round-robin-view';
var robin = require('roundrobin');

export const roundRobinMatches = (pools: string[]) => {
    const matchesPerPool = pools.map(pool => {
        const singlePoolArray = pool.split(',');
        const indexedSinglePoolArray = singlePoolArray.map(pool => uuidv4() + ',' + pool);
        const matchesSinglePool = robin(indexedSinglePoolArray.length, indexedSinglePoolArray);
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
                const infoArray: string[] = match;
                const p1Info: IPlayerInfo = { id: infoArray[0].split(',')[0], name: infoArray[0].split(',')[1] };
                const p2Info: IPlayerInfo = { id: infoArray[1].split(',')[0], name: infoArray[1].split(',')[1] };
                const p1: IPlayerInfo = p1Info;
                const p2: IPlayerInfo = p2Info;
                const playerArray: IPlayerInfo[] = [p1, p2];
                matchArray.push(playerArray);
            });
        });
    });
    return matchArray;
};