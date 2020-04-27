import { OPORTUNIDADE_TYPE } from '../types'

export const ADD_OPORTUNITIES = data => {
    return {
        type: OPORTUNIDADE_TYPE.ASYNC_ADD_OPORTUNITY,
        data
    }
}

export const SETVALUE = (state, action) => {
    const { field, value } = action;
    return {...state, [field]: value }
}


export const setValue = (value, field) => { return { type: OPORTUNIDADE_TYPE.SET_VALUE, value, field } };