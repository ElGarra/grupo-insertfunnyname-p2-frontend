import React, {
  createContext, //
  useEffect,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionExpDate, setSessionExpDate] = useState();
  const history = useHistory();
  let logoutTimer;

  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.accessToken).exp * 1000);
    setCurrentUser(user);
    setSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setSessionExpDate();
  };

  const handleAutomaticLogout = useCallback(() => {
    setCurrentUser(null);
    setSessionExpDate();
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
  children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
