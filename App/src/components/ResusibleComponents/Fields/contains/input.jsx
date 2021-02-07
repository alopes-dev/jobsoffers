import React ,{ useEffect, useRef } from 'react';
import  {useField} from '@unform/core';

export default function Input({name,...rest}) {
    const inputRef = useRef(null);
    const {fieldName, registerField,defaultValue, error } = useField(name)


    useEffect(() => {
        registerField({
            name:fieldName,
            ref:inputRef.current,
            path:'value'
        })
    }, [fieldName,registerField])

    return (
        <div className={`form-group mb-2 p-0 ${error && 'has-error'}`}>
            <label htmlFor={rest.id}>{rest.label}</label>
            <input defaultValue={defaultValue}  className="form-control mb-0" {...rest} ref={inputRef}/>
            {error && <small id="" className={`form-text  text-danger` }>{error}</small>}
        </div>
    )
}
