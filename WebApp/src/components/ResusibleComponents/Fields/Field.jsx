import React from 'react';
import { isEmpty } from '../../../helpers';

import Input from './contains/input';
import ISelect from './contains/select';
/**
 * Validete options : has-success, has-error,
 * @param {
 * } props
 */

export default function Field(props) {
  let validate = '';
  const { label, msm, id, fieldtype: TYPE } = props;
  if (isEmpty(TYPE)) return;
  if (typeof TYPE !== 'string') return;
  if (!isEmpty(msm)) {
    validate = msm.validate;
  }
  switch (TYPE.toLowerCase()) {
    case 'input':
      return <Input {...props} />;
    case 'textarea':
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <textarea {...props} className="form-control" id={id}></textarea>
        </div>
      );
    case 'select':
      return <ISelect {...props} />;
    default:
      return <></>;
  }
}
