import * as React from 'react';

interface IMatchContext {
    ongoingMatches: string[];
    setOngoingMatches: React.Dispatch<string[]>;
    completedMatches: string[];
    setCompletedMatches: React.Dispatch<string[]>;
    occupiedStations: number[];
    setOccupiedStations: React.Dispatch<number[]>;
    occupiedPlayers: string[];
    setOccupiedPlayers: React.Dispatch<string[]>;
}

export const MatchContext = React.createContext<IMatchContext>({
    ongoingMatches: [],
    setOngoingMatches: (ongoingMatches: string[]) => { /* noop */ },
    completedMatches: [],
    setCompletedMatches: (completedMatches: string[]) => { /* noop */ },
    occupiedStations: [],
    setOccupiedStations: (occupiedStations: number[]) => { /* noop */ },
    occupiedPlayers: [],
    setOccupiedPlayers: (occupiedStations: string[]) => { /* noop */ },
});

export const MatchProvider: React.FC = ({ children }) => {
    const [ongoingMatches, setOngoingMatches] = React.useState([] as string[]);
    const [completedMatches, setCompletedMatches] = React.useState([] as string[]);
    const [occupiedStations, setOccupiedStations] = React.useState([] as number[]);
    const [occupiedPlayers, setOccupiedPlayers] = React.useState([] as string[]);

    return (
        <MatchContext.Provider value={{
            ongoingMatches,
            setOngoingMatches,
            completedMatches,
            setCompletedMatches,
            occupiedStations,
            setOccupiedStations,
            occupiedPlayers,
            setOccupiedPlayers
        }}>
            {children}
        </MatchContext.Provider>
    );
};

export default MatchContext;