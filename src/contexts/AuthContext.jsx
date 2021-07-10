import React, { createContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage('sessionExp');
  const history = useHistory();
  let logoutTimer;

  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.token).exp * 1000);
    storeUser(user.token);
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    clearStoredUser();
    clearSessionExpDate();
  };

  const handleAutomaticLogout = useCallback(() => {
    clearStoredUser();
    clearSessionExpDate();
    history.push('/login');
  }, []);

  useEffect(() => {
    if (currentUser && sessionExpDate) {
      const remainingTime = new Date(sessionExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleAutomaticLogout]);

  return (
    <AuthContext.Provider value={{ currentUser, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
