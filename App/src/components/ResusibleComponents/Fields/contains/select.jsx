import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core';
import Select  from 'react-select';

export default function ISelect({ name, ...rest }) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
          name: fieldName,
          ref: selectRef.current,
          path: 'state.value',
          getValue: (ref) => {
            if (rest.isMulti) {
              if (!ref.state.value)return [];
              return ref.state.value.map((option) => option.value);
            } else {
              if (!ref.state.value)return '';
              return ref.state.value.value;
            }
          },
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fieldName, registerField, rest.isMulti]);

    return (
        <div className=" mb-2">
            <label htmlFor={rest.id} style={{marginBottom: ".5rem", color: "#495057", fontWeight: "600", fontSize: "1rem",  whiteSpace: "nowrap"}} >{rest.label}</label>
            <Select {...rest} 
                 defaultValue={defaultValue}
                 ref={selectRef}
                 classNamePrefix={`${error && "has-error "} react-select`}
                 isClearable= {true}
            />
              {error && <small id="" className={`form-text  text-danger` }>{error}</small>}
        </div>
    )
}
