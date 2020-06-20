/* eslint-disable valid-typeof */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
exports.isEmpty = (input) => {
    if (typeof input === 'array') {
        return input.length === 0;
    }
    return !input || Object.keys(input).length === 0;
};

export const numberFormater = (value) => {
    return Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'AKZ',
    }).format(value);
};