import { OPORTUNIDADE_TYPE } from '../types'
import { SETVALUE } from '../actions/oportunidade'

const oportunidade = (state = [], action) => {
    const { type } = action;
    switch (type) {
        case OPORTUNIDADE_TYPE.ADD_OPORTUNITY:

            return state;
        case OPORTUNIDADE_TYPE.REMOVE_OPORTUNITY:

            break;
        case OPORTUNIDADE_TYPE.UPDATE_OPORTUNITY:

            break;
        case OPORTUNIDADE_TYPE.SET_VALUE:
            return SETVALUE(state, action)
        default:
            return state;
    }
}

export default oportunidade;