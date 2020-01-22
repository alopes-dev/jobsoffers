import React from 'react'
import { isEmpty } from '../../../helpers';
import Select from 'react-select'
/**
 * Validete options : has-success, has-error,
 * @param {
 * } props 
 */

export default function Field(props) {
    let validate = '';
    const {label,msm,id,fieldtype:TYPE} = props;
    if(isEmpty(TYPE)) return;
    if(typeof TYPE !== 'string') return;
    if(!isEmpty(msm)){
        validate = msm.validate;
    }
    switch (TYPE.toLowerCase()) {
        case 'input':
            return (
                <div className={`form-group mb-2 p-0 ${validate}`}>
                    <label htmlFor={id}>{label}</label>
                    <input  className="form-control mb-0" {...props}/>
                    {
                        !isEmpty(msm)
                        ? 
                            msm.show !== undefined &&  msm.show === true
                            ?<small id="" className={`form-text  text-${msm.type.toLowerCase()}` }>{!isEmpty(msm.text) ? msm.text : 'Nenhum mensagem'}</small>
                            :''
                        :''
                    }
                   
                </div>
            )
        case 'textarea':
            return (
                <div className="form-group">
                    <label htmlFor={id}>{label}</label>
                    <textarea className="form-control" id={id}> </textarea>
                </div>
            )
        case 'select':
            return (
                <div className=" mb-2">
                    <label htmlFor={id}
                        style={{marginBottom: ".5rem", color: "#495057", fontWeight: "600", fontSize: "1rem",  whiteSpace: "nowrap"}}
                    >{label}</label>
                    <Select 
                     {...props}
                    />
                </div>
            )
        default:
            return <></>
    }
   
}
