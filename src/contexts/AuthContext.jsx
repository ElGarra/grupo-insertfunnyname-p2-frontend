import React, {
  createContext, //
  useEffect,
  useCallback,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage('sessionExp');
  const history = useHistory();
  let logoutTimer;

  const handleUserLogin = (user) => {
    const decodedToken = jwtDecode(user.token);
    const expiration = new Date(decodedToken.exp * 1000);
    storeUser(user.token);
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    clearStoredUser();
    setIsAdmin(false);
    clearSessionExpDate();
  };

  const handleAutomaticLogout = useCallback(() => {
    clearStoredUser();
    setIsAdmin(false);
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

  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser);
      setIsAdmin(Boolean(decodedToken.admin));
    }
  }, [currentUser, isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin, //
        currentUser,
        handleUserLogin,
        handleUserLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
