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
    const matchArray: [][] = [];
    pools.forEach(pool => {
        pool.forEach(round => {
            round.forEach(match => {
                matchArray.push(match);
            });
        });
    });
    return matchArray;
};