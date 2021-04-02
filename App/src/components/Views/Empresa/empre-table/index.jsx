import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "reactstrap";
import Tbody from "./tbody";
import Thead from "./thead";
import api from "../../../../services/service";
import { EmployersSchemas } from "./utils";
import { toast } from "react-toastify";

export default function InsurenceTable() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    (async function getEmployers() {
      const response = await api.useGeneric({
        query: EmployersSchemas,
      });

      const { data } = await response.json();

      if (!data) return toast.error("Alguma coisa correu mal");
      setEmployers(data.Empresas);
    })();
  }, []);

  return (
    <Table>
      <Thead />
      <Tbody employers={employers} />
    </Table>
  );
}
