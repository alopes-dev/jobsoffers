/* eslint-disable eol-last */
import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/service';
import { toast } from 'react-toastify';

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
      const storageUser = localStorage.getItem('@jobs:user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
      setTimeout(() => {
        setLoading(false);
      }, 2500);
      // }, 0);
    }

    loadStorageData();
  }, []);

  async function signIn(data, setIsLoading) {
    // setProcessing(true);
    // data.Provider = 1;

    const response = await api.store({
      table: 'Settion',
      useExclamation: true,
      type: 'STORE',
      properties: 'UserName, Provider, Email, EmpresaId PessoaId',
      value: data,
    });

    if (!response.ok) {
      const { errors } = response;
      setProcessing(false);
      setIsLoading(false);
      setTimeout(() => {
        setFlag({ message: '', isOpen: false });
      }, 3000);

      toast.error(errors[0].message);
      return setFlag({ message: errors[0].message, isOpen: true });
    }
    const { addSettion } = response.data;

    localStorage.setItem('@jobs:user', JSON.stringify(addSettion));
    setUser(addSettion);
    setIsLoading(false);
    return response;
  }

  function signOut() {
    setProcessing(false);
    localStorage.clear();
    setUser(null);
  }

  async function signUp(data) {
    setProcessing(true);

    const { NomeCompleto } = data;

    delete data.NomeCompleto;

    const [Nome, SobreNome] = NomeCompleto.split(' ');

    const result = await api.store({
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
      {children}{' '}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
