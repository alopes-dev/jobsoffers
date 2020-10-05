import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store/index';

import history from '../../history';

import AddCandidato from '../../components/Views/Candidato/addCandidato';
import ListCandidato from '../../components/Views/Candidato/listCandidato';
import CoreOportunidade from '../../components/Views/Oportunidade/index';
import Dashboard from '../../components/Views/Dashboard/dashboard';
import ListOportunidade from '../../components/Views/Oportunidade/listOportunidade';
import VOp360 from '../../components/Views/Oportunidade/360';
import CurriculumViewer from '../Views/Candidato/CurriculumViewer';
import EmpresaCore from '../Views/Empresa';

export default function MainRouter() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/list-oportunidade" component={ListOportunidade} />
        <Route path="/oportunidade" component={CoreOportunidade} />
        <Route path="/general-view" component={VOp360} />
        <Route path="/curriculum-viewer" component={CurriculumViewer} />
        <Route path="/list-candidato" component={ListCandidato} />
        <Route path="/enterprise" component={EmpresaCore} />
        <Route path="/candidato" component={AddCandidato} />
      </Switch>
    </Provider>
  );
}
