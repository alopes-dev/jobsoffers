import React from 'react'
import {Provider} from 'react-redux';
import AddOportunidade from './addOportunidade';
import store from '../../../store/index'

 const OportunidadeCore =()=> {
    return (
        <Provider store={store}>
            <AddOportunidade />
        </Provider>
    )
}

export default OportunidadeCore;