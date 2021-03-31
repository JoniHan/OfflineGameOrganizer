import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/button';

const TitleWrapper = styled.div`
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    `;

export const HomeView = () => {
    return (
        <TitleWrapper>
            <h1>GET READY FOR THE NEXT BATTLE</h1>
            <Link to="/roundrobin"><Button className={'btn btn-primary btn-lg ml-3 mt-3'}>Round robin scheduler</Button></Link>
        </TitleWrapper>
    );
}

export default HomeView;
