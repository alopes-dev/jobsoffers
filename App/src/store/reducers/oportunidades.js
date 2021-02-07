import { OPORTUNIDADE_TYPE } from '../types';
import { SETVALUE } from '../actions/oportunidade';

const INITIAL_DATA = {
    oportunidadeId: null,
    IsAnalizado: '',
};

const oportunidade = (state = INITIAL_DATA, action) => {
    const { type, payload } = action;
    switch (type) {
        case OPORTUNIDADE_TYPE.ADD_OPORTUNITY:
            return state;
        case OPORTUNIDADE_TYPE.REMOVE_OPORTUNITY:
            break;
        case OPORTUNIDADE_TYPE.UPDATE_OPORTUNITY:
            break;
        case OPORTUNIDADE_TYPE.SET_VALUE:
            return SETVALUE(state, action);
        case OPORTUNIDADE_TYPE.SET_OPORTUNITY_ID:
            return {...state, oportunidadeId: payload.id };
        default:
            return state;
    }
};

export default oportunidade;