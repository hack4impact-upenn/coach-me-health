import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import auth from '../api/core/auth';

const NavbarContainer = styled.div`
  overflow-x: hidden;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 30px 20px 30px;
  // background-color: #000000;

`;

const NavbarItem = styled.div`
  display: block;
  cursor: pointer;
  text-align: center;
  background-color: #F29DA4;
  padding: 20px 22px 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: #f2c2c6;
    transform: scale(1.02)
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
      {/* <img src="https://images.typeform.com/images/aBuTPD2X63gc/image/default" width="40px"></img> */}
      <NavbarItem>
        <a><i className="far fa-user icon"></i></a>
      </NavbarItem>
      <NavbarItem>
        <a><i className="far fa-user icon"></i></a>
      </NavbarItem>
      <NavbarItem>
        <a><i className="far fa-user icon"></i></a>
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;
