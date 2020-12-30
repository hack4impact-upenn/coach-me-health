import React from 'react';
import styled from 'styled-components';
import TextSendBar from "../components/TextSendBar"

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

const TextContainer = styled.table`
    background: #FFFFFF;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
`

enum Texter {
    PATIENT,
    BOT,
    COACH
}

interface SMSProps {
    messages: any[],
    patient: any
}

interface TextProps {
    message: string,
    type: Texter
}

const TextBubblePatient = styled.div`
    background: #D3D3D3;
    border-radius: 0px 15px 15px 15px;
    float: left
`

const TextBubbleBot = styled.div`
    background: #A6CEE3;
    border-radius: 15px 0px 15px 15px;
    float: right
`

const TextBubbleCoach = styled.div`
    background: #637792;
    border-radius: 15px 0px 15px 15px;
    float: right
`

const TextBubbleRow = styled.div`
    max-height: 5px;
`

const TextBubbleText = styled.div`
    font-family: Avenir;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 25px;
    color: #404040;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center
`
const SendButton = styled.button`
    float: right;

    padding: 10px 25px;
    background-color: #F29DA4 !important;
    font-size: 13px !important;
    border-radius: 15px !important;
    color: white !important;
    border: none !important;
    font-weight: 600;

    &:hover {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
        cursor: pointer;
    }

    &:focus {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }
`

const TextSendBarContainer = styled.div`
    className: column is-three-quarters;
    width: 100%;
    height: 40%;
`

const TextBubble: React.FC<TextProps> = ({message, type}: TextProps) => {
    if (type == Texter.PATIENT) {
        return (
            <TextBubblePatient> 
                <TextBubbleText> {message} </TextBubbleText>
            </TextBubblePatient>
        );
    }
    else if (type == Texter.BOT) {
        return (
            <TextBubbleBot> 
                <TextBubbleText> {message} </TextBubbleText>
            </TextBubbleBot>
        );
    }
    else {
        return (
            <TextBubbleCoach> 
                <TextBubbleText> {message} </TextBubbleText>
            </TextBubbleCoach>
        );
    }
}

const SMSTile: React.FC<SMSProps> = ({messages, patient}: SMSProps) => {
    const onSend = () => {
        alert(`You sent a message!`);
    }
    
    return (
        <SMSTileContainer>
            <BoxTop> 
                <PhoneNumber>{patient.phoneNumber}</PhoneNumber> 
            </BoxTop>
            <TextContainer>
                {messages.map((message) => <tr><TextBubbleRow><TextBubble message={message.message} type={message.type}></TextBubble></TextBubbleRow></tr>)}
            </TextContainer>
            <div className = "columns">
                <TextSendBarContainer>
                    <TextSendBar placeholder = {"Enter your response"} onSend = {onSend}> </TextSendBar>
                </TextSendBarContainer>

            </div>
        </SMSTileContainer>
    );
};

export {SMSTile, Texter};