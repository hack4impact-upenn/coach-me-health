import React from 'react';
import styled from 'styled-components';

const SMSTileContainer = styled.div`
    display: flex;
    border-radius: 16px; 
    padding: 16px; 
    justify-content: space-between;
    margin: auto;
    flex-direction: column;
    background: #FFFFFF;
    height: 100%;
`;

const PhoneNumber = styled.p`
    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    color: #404040;
    padding-top: 23px;
    padding-bottom: 15px;
    text-align: center
`;

const BoxTop = styled.div`
    width: 100%;
    height: 70px;
    left: 817px;
    top: 48px;      
    background: #DDE1E7;
    border-radius: 16px 16px 0px 0px;
`;

const TextContainer = styled.div`
    background: #87ceeb;
    width: 100%;
    height: 90%;
`

const ResponseBar = styled.div`
    background: #DDE1E7;
    border-radius: 5px;
    width: 50%;
`

export enum TextType {
    Patient,
    Bot,
    Coach
}

interface Props {}

const SMSTile: React.FC<Props> = ({}) => {
  return (
    <SMSTileContainer>
        <BoxTop> 
            <PhoneNumber>914-304-3919</PhoneNumber> 
        </BoxTop>
        <TextContainer> </TextContainer>
        <div className = "columns"> 
            <ResponseBar> asdf </ResponseBar>
            <div className = "column">
                hello
            </div>
        </div>
    </SMSTileContainer>
  );
};

export default SMSTile;