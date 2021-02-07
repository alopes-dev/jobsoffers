import React from 'react';
import { useEmpresa } from '../../../contexts/empresa';
import { Card, CardBody } from 'reactstrap';

const EmpresaCore = (props) => {
  const { enterprise } = useEmpresa();

  return (
    <Card>
      <CardBody>
        <h1>antonio</h1>
      </CardBody>
    </Card>
  );
};

export default EmpresaCore;
