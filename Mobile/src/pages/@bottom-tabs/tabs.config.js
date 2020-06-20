/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */

import Colores from '~/config/Colores';

export const tabBarOptions = {
    activeTintColor: Colores.Primary,
    inactiveTintColor: Colores.Secondary,
    showLabel: false,
    showIcon: true,
    style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 9,
    },
};

export const ICON_SIZE = 34;