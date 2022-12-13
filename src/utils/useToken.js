import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    let tokenString = sessionStorage.getItem('token');
    let userToken = JSON.parse(tokenString);
    if (!userToken && localStorage.getItem('token')) {
      let tokenString = localStorage.getItem('token');
      sessionStorage.setItem('token',tokenString);
      sessionStorage.setItem('firstName', localStorage.getItem('firstName'));
      sessionStorage.setItem('userID', localStorage.getItem('userID'));
      let userToken = JSON.parse(tokenString);
      return userToken
    }

    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken, fName, userID, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('token', JSON.stringify(userToken));
      localStorage.setItem('userID', JSON.stringify(userID));
      localStorage.setItem('firstName', JSON.stringify(fName));
    }
    sessionStorage.setItem('token', JSON.stringify(userToken));
    sessionStorage.setItem('userID', JSON.stringify(userID));
    sessionStorage.setItem('firstName', JSON.stringify(fName));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}