/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { createContext, useState, useContext } from 'react';

const AuthScreenContext = createContext({
  isTypeing: false,
  isFocus: () => {},
  isBlur: () => {},
});

export const AuthScreenProvider = ({ children }) => {
  const [isTypeing, setIsTypeing] = useState(false);

  function isFocus() {
    setIsTypeing(true);
  }

  function isBlur() {
    setIsTypeing(false);
  }

  return (
    <AuthScreenContext.Provider value={{ isTypeing, isBlur, isFocus }}>
      {children}
    </AuthScreenContext.Provider>
  );
};

export function useAuthScreen() {
  return useContext(AuthScreenContext);
}
