import * as React from 'react';

interface IMatchContext {
    ongoingMatches: string[];
    setOngoingMatches: React.Dispatch<string[]>;
    completedMatches: string[];
    setCompletedMatches: React.Dispatch<string[]>;
}

export const MatchContext = React.createContext<IMatchContext>({
    ongoingMatches: [],
    setOngoingMatches: (ongoingMatches: string[]) => { /* noop */ },
    completedMatches: [],
    setCompletedMatches: (completedMatches: string[]) => { /* noop */ },
});

export const MatchProvider: React.FC = ({children}) => {
    const [ongoingMatches, setOngoingMatches] = React.useState([] as string[]);
    const [completedMatches, setCompletedMatches] = React.useState([] as string[]);

    return (
        <MatchContext.Provider value={{
            ongoingMatches,
            setOngoingMatches,
            completedMatches,
            setCompletedMatches
        }}>
            {children}
        </MatchContext.Provider>
    );
};

export default MatchContext;