import * as React from 'react';

interface IMatchContext {
    occupants: string[];
    setOccupants: React.Dispatch<string[]>;
    occupiedStations: number[];
    setOccupiedStations: React.Dispatch<number[]>;
    ongoingMatches: string[];
    setOngoingMatches: React.Dispatch<string[]>;
    completedMatches: string[];
    setCompletedMatches: React.Dispatch<string[]>;
}

export const MatchContext = React.createContext<IMatchContext>({
    occupants: [],
    setOccupants: (occupants: string[]) => { /* noop */ },
    occupiedStations: [],
    setOccupiedStations: (occupiedStations: number[]) => { /* noop */ },
    ongoingMatches: [],
    setOngoingMatches: (ongoingMatches: string[]) => { /* noop */ },
    completedMatches: [],
    setCompletedMatches: (completedMatches: string[]) => { /* noop */ },
});

export const MatchProvider: React.FC = ({children}) => {
    const [occupants, setOccupants] = React.useState([] as string[]);
    const [occupiedStations, setOccupiedStations] = React.useState([] as number[]);
    const [ongoingMatches, setOngoingMatches] = React.useState([] as string[]);
    const [completedMatches, setCompletedMatches] = React.useState([] as string[]);

    return (
        <MatchContext.Provider value={{
            occupants,
            setOccupants,
            occupiedStations,
            setOccupiedStations,
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