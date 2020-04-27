/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '~/services/auth';

const initialFunc = () => {};

const AuthContextData = {
  signed: false,
  loading: true,
  user: {},
  signIn: initialFunc,
  signOut: initialFunc,
};

const AuthContext = createContext(AuthContextData);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@jobs:user');
      const storageToken = await AsyncStorage.getItem('@jobs:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  });

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    await AsyncStorage.setItem('@jobs:token', response.token);
    await AsyncStorage.setItem('@jobs:user', JSON.stringify(response.user));
  }

  function signOut() {
    AsyncStorage.clear().then(() => setUser(null));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
