/* eslint-disable eol-last */
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react';

import api from '../services/service';
import { toast } from 'react-toastify';

const EmpresaContextData = {};

const EmpresaContext = createContext(EmpresaContextData);

export const EmpresaProvider = ({ children }) => {
  const [enterprise, setEnterprise] = useState({});
  useEffect(() => {}, []);

  const EmpresaValues = useMemo(() => ({ enterprise, setEnterprise }), [
    enterprise,
    setEnterprise,
  ]);

  return (
    <EmpresaContext.Provider value={EmpresaValues}>
      {children}
    </EmpresaContext.Provider>
  );
};

export function useEmpresa() {
  return useContext(EmpresaContext);
}
