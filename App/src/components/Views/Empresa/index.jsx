import React from "react";
import { useEmpresa } from "../../../contexts/empresa";
import { Card, CardBody } from "reactstrap";
import InsurenceTable from "./empre-table";

const EmpresaCore = (props) => {
  const { enterprise } = useEmpresa();

  return (
    <Card>
      <CardBody>
        <InsurenceTable />
      </CardBody>
    </Card>
  );
};

export default EmpresaCore;
