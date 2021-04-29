import * as React from 'react';

interface IPoolContext {
    pools: string[];
    setPools: React.Dispatch<string[]>;
}

export const PoolContext = React.createContext<IPoolContext>({
    pools: [],
    setPools: (pools: string[]) => { /* noop */ }
});

export const PoolProvider: React.FC = ({children}) => {
    const [pools, setPools] = React.useState([] as string[]);

    return (
        <PoolContext.Provider value={{
            pools,
            setPools
        }}>
            {children}
        </PoolContext.Provider>
    );
};

export default PoolContext;