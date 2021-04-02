import React, { useCallback } from "react";
import { Badge } from "reactstrap";
import { toast} from 'react-toastify'

const Tbody = ({ employers = [] }) => {

  async function RemoveEmployer(Id) {
    const response = await api.useGeneric({
      query: EmployersSchemas,
    });

    const { data } = await response.json();

  }

  const handleRemove = async (Id) =>{
    try {
      if(!Id) throw new Error("Ocorreu um erro");

      await RemoveEmployer(Id)

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tbody>
      {employers.map(({ Id, Designacao, Nif, Telefone, Estado }) => (
        <tr key={Id}>
          <th>{Designacao}</th>
          <th>{Nif}</th>
          <th>{Telefone}</th>
          <th>{Estado?.Designacao || "Pedente"}</th>
          <th style={{ textAlign: "center" }}>
            <Badge color="primary" className="ml-2 mr-1 c-pointer">
              Visualizar
            </Badge>
            <Badge color="success" className="ml-2 mr-1 c-pointer">
              Editar
            </Badge>
            <Badge color="danger" onClick={()=>{handleRemove(Id)}} className="ml-2 mr-2 c-pointer">
              Apagar
            </Badge>
          </th>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
