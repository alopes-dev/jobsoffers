import React, { useState, useEffect } from 'react';
import Field from '../../../../components/ResusibleComponents/Fields/Field';
import iService from '../../../../services/service';

const IdiomasForm = () => {
  const [idiomas, setIdiomas] = useState([]);

  useEffect(() => {
    iService
      .fetch({
        table: 'Idiomas',
        properties: 'Id Designacao',
      })
      .then((response) => {
        console.log(response);
        if (!response.ok) return;
        setIdiomas(
          response.data?.map((item) => ({
            label: item.Designacao,
            value: item.Id,
          }))
        );
      });
  }, []);

  return (
    <div>
      <Field
        label="Designação"
        type="text"
        fieldtype="select"
        name="IdiomaId"
        options={idiomas}
      />
      <Field
        label="Percentagem %"
        type="number"
        fieldtype="input"
        name="Percentagem"
      />
    </div>
  );
};

export default IdiomasForm;
