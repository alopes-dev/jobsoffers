import React from 'react';

const SettingDetailsSimples = ({ value, title }) => {
  return (
    <li>
      <span className="name-specification">{title}</span>
      <span className="status-specification">
        {value} <i className="flaticon-pen ml-2"></i>
      </span>
    </li>
  );
};

export default SettingDetailsSimples;
