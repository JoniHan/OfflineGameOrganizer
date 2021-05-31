import React from 'react';
import styled from 'styled-components';
import { fetchAllTournaments } from '../api/challonge/actions/tournaments';
import { Button } from '../components/button';
import { Input } from '../components/input';
import TournamentContainerGroup from '../components/tournament-container-group';

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

export interface IPlayerInfo {
    id: string;
    name: string;
};

export interface IStationMatch {
    matchId: string;
    p1Id: string;
    p2Id: string;
    matchCaption: string;
};

export interface ITournamentProps {
    name: string;
    id: number;
}

export const ChallongeConnectionView = () => {
    const [apiKey, setApiKey] = React.useState('');
    const [tournamentApiData, setTournamentApiData] = React.useState([] as any[]);

    return (
        <>
            <TitleWrapper>
                <h1>Challonge API</h1>
                <p>Fill in your username and API key to use the functionality</p>
            </TitleWrapper>
            <div className={'form-group'}>
                <div className={'col-md-12'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <Input
                                className={'form-control'}
                                onChange={
                                    (event) => {
                                        setApiKey(event.target.value);
                                    }
                                }
                                type={'password'}
                                labelText={'API key'}
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
                                <h2>Api actions</h2>
                            </TitleWrapper>
                        </div>
                        <ButtonWrapper className={'col-md-12'}>
                            <Button className={'btn btn-primary btn-xs ml-3 mt-3'} disabled={apiKey === '' ? true : false} onClick={
                                async () => {
                                    const result = await fetchAllTournaments(apiKey) as any[];
                                    setTournamentApiData(result);
                                }}>
                                {'Get all tournaments'}
                            </Button>
                        </ButtonWrapper>
                    </div>
                </div>
            </div>
            <hr />
            <div className={'col-md-12'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <TitleWrapper>
                            <h2>In development</h2>
                        </TitleWrapper>
                    </div>
                    <TournamentContainerGroup tournaments={tournamentApiData} />
                </div>
            </div>
        </>
    );
}

export default ChallongeConnectionView;
