import * as React from 'react';

interface IOccupiedContext {
    occupants: string[];
    setOccupants: React.Dispatch<string[]>;
    occupiedStations: number[];
    setOccupiedStations: React.Dispatch<number[]>;
}

export const OccupiedContext = React.createContext<IOccupiedContext>({
    occupants: [],
    setOccupants: (occupants: string[]) => { /* noop */ },
    occupiedStations: [],
    setOccupiedStations: (occupants: number[]) => { /* noop */ },
});

export const OccupiedProvider: React.FC = ({children}) => {
    const [occupants, setOccupants] = React.useState([] as string[]);
    const [occupiedStations, setOccupiedStations] = React.useState([] as number[]);

    return (
        <OccupiedContext.Provider value={{
            occupants,
            setOccupants,
            occupiedStations,
            setOccupiedStations
        }}>
            {children}
        </OccupiedContext.Provider>
    );
};

export default OccupiedContext;