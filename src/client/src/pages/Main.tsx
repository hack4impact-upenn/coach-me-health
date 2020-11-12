import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import '../styles/main.css';


const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 80vw;
`;

const ButtonGroup = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  margin: 5px;
`;

const Main = () => {
  const history = useHistory();

  return (
    // TODO: 
    // MAKE PAGES
    // UPDATE STYLING/MAKE UNIVERSAL STYLING/PRELIM DASBHOARD DESIGN
    // <ContentContainer>
    //   <h1 className="title is-1">Welcome to TS Boilerplate</h1>
    //   <p>
    //     Dead simple monorepo boilerplate web project designed to take you from
    //     Git Cloning to Heroku Deployment in less 5 minutes. 🚀🤩
    //   </p>
    //   <a href="https://github.com/Orang-utan/ts-boilerplate">
    //     Check out our Github
    //   </a>
    //   <ButtonGroup>
    //     <Button
    //       className="button is-primary"
    //       onClick={() => history.push('/signup')}
    //     >
    //       Sign Up
    //     </Button>
    //     <Button
    //       className="button is-secondary"
    //       onClick={() => history.push('/login')}
    //     >
    //       Login
    //     </Button>
    //   </ButtonGroup>
    // </ContentContainer>
      <ContentContainer>
        <h1>Welcome to the CoachMe Health patient dashboard!</h1>
        <p>This is some placeholder text.</p>
      </ContentContainer>
  );
};

export default Main;
