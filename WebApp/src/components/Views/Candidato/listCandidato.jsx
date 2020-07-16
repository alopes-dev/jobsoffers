import React, { useState } from 'react';
import Index from '../../ResusibleComponents/@tables';

export default function ListCandidato() {
  const [values, setValues] = useState([]);
  return (
    <div>
      <Index
        values={values}
        options={{
          Nome: {
            preview: 'Nome Completo',
          },
          DataNascimento: {
            preview: 'Data de Nascimento',
          },
          Telefone: {
            preview: 'Telefone',
          },

          Email: {
            preview: 'Email',
          },
          Idioma: {
            preview: 'Idioma',
          },
          Morada: {
            preview: 'Morada',
          },
          Nacionalidade: {
            preview: 'País',
          },
          Estado: {
            preview: 'Estado',
          },
        }}
        // onItemClick={handleItemClick}
        // removeLine={(e) => {
        //   handleRemoveItem(e.Id);
        // }}
        editLine={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}
