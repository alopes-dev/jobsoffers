import React, { useState } from 'react';
import Field from '../../../../components/ResusibleComponents/Fields/Field';

const HobbesForm = () => {
  const [description, setDescription] = useState('');
  return (
    <div>
      <Field
        label="Designação"
        type="text"
        fieldtype="input"
        name="Designacao"
      />
      <Field
        label="Percentagem"
        type="number"
        fieldtype="input"
        name="Percentagem"
      />
      <Field
        label="Descrição"
        type="textarea"
        fieldtype="textarea"
        name="Descricao"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Field
        type="text"
        hidden
        fieldtype="input"
        value={description}
        name="Descricao"
      />
    </div>
  );
};

export default HobbesForm;
