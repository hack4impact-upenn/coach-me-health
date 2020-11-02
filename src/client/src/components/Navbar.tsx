import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import auth from '../api/core/auth';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  max-width: 200px;
  width: 100%;
  margin-left: 2.5rem;
  margin-top: 4%;
  background-color: #FFFFFF;

`;

const NavbarItem = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  width: 34%;
  margin: 0 auto 20px 0;
  text-align: center;
  background-color: #F29DA4;
  padding: 20px 17px 20px;
  border-radius: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-
    color: rgba(44, 62, 80, 0.1);
  }
  &:active {
    opacity: 0.6;
  }
`;

const Navbar = () => {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(auth.isAuthenticated());

  const logout = ({ loggedIn }: { loggedIn: boolean }) => {
    history.push('/');
    setLoggedIn(loggedIn);
  };

  const login = ({ loggedIn }: { loggedIn: boolean }) => {
    setLoggedIn(loggedIn);
  };

  auth.addLoginSubscribers(login);
  auth.addLogoutSubscribers(logout);

  return (
    <NavbarContainer>
      <NavbarItem>
        <a><i className="far fa-user icon"></i></a>
      </NavbarItem>
      {/* <NavbarItem>
        {loggedIn && (
          <h1
            className="title is-6 has-text-white"
            onClick={() => auth.logout()}
          >
            Logout
          </h1>
        )}
      </NavbarItem> */}
    </NavbarContainer>
  );
};

export default Navbar;
