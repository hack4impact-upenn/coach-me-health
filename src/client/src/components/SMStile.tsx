import React from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
    display: flex;
    border-radius: 16px; 
    padding: 16px; 
    min-height: 100px;   
    margin: 48px 69px;
    justify-content: space-between;
    margin: auto;
`;

const MessageBox = styled.div`
    position: absolute;
    width: 554px;
    height: auto;
    left: 817px;
    top: 48px; 
    bottom: 10.35%;
    box-shadow: 5px 5px 10px rgba(221, 225, 231, 0.5);
    border-radius: 16px;
`;

const BoxTop = styled.div`
    position: absolute;
    width: 554px;
    height: 55.63px;
    left: 817px;
    top: 48px;      
    background: #DDE1E7;
    border-radius: 16px 16px 0px 0px;
`;

const PhoneNumber = styled.p`
    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    color: #404040;
    position: absolute;
    margin: 16px 231px 16px 231px;
`;


interface Props {

}

const SMSTile: React.FC<Props> = ({}) => {
  return (
    <TextContainer>
        <BoxTop> 
            <PhoneNumber>123-456</PhoneNumber> 
        </BoxTop>
        <MessageBox></MessageBox>
    </TextContainer>
  );
};

export default SMSTile;