/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/service';

const initialFunc = () => {};

const AuthContextData = {
  signed: false,
  flag: { message: '', isOpen: false },
  loading: true,
  isProcessing: false,
  user: {},
  signIn: initialFunc,
  signOut: initialFunc,
  signUp: initialFunc,
};

const AuthContext = createContext(AuthContextData);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [flag, setFlag] = useState({ message: '', isOpen: false });

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@jobs:user');
      // const storageToken = await AsyncStorage.getItem('@jobs:token');
      // && storageToken
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  });

  async function signIn(data) {
    setProcessing(true);

    const _user = await api.store({
      table: 'Settion',
      useExclamation: true,
      type: 'STORE',
      properties: 'UserName, Provider, Email, PessoaId',
      value: data,
    });

    if (!_user.ok) {
      const { errors } = _user;
      setProcessing(false);

      setTimeout(() => {
        setFlag({ message: '', isOpen: false });
      }, 3000);

      return setFlag({ message: errors[0].message, isOpen: true });
    }
    const { addSettion } = _user.data;

    setUser(addSettion);

    // await AsyncStorage.setItem('@jobs:token', addSettion.Token);
    await AsyncStorage.setItem('@jobs:user', JSON.stringify(addSettion));
  }

  function signOut() {
    setProcessing(false);
    AsyncStorage.clear().then(() => setUser(null));
  }

  async function signUp(data) {
    setProcessing(true);

    const { NomeCompleto } = data;

    delete data.NomeCompleto;

    const [Nome, SobreNome] = NomeCompleto.split(' ');

    let result = await api.store({
      table: 'Pessoa',
      type: 'STORE',
      properties: 'Id',
      value: { ...data, Nome, SobreNome },
    });

    if (result.ok) {
      setProcessing(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        loading,
        signUp,
        isProcessing,
        flag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
