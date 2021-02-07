exports.Round_Values = (num, dec) => {

        if ((typeof num !== 'number') || (typeof dec !== 'number'))
            return false;
        var num_sign = num >= 0 ? 1 : -1;

        return (Math.round((num * Math.pow(10, dec)) + (num_sign * 0.0001)) / Math.pow(10, dec)).toFixed(dec).replace('.', ',');
    }
    /**
     * 
     * @param {any} x
     */
exports.NumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

exports.IssCodeGenerator = () => {
    var _code = "";
    var type = "abcdefghijklmnopqsrtuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 10; i++) {
        var pos = Math.floor(Math.random() * type.length);
        _code += type.charAt(pos);
    }
    return _code;
}

exports.IS_TYPEOF = {
    object: input => !Object.getOwnPropertySymbols(input).length && !Object.getOwnPropertyNames(input).length,
    array: input => typeof input === 'array',
    string: input => typeof input === 'string'
}

exports.isEmpty = (input) => {
    if (typeof input === 'array') {
        return input.length === 0;
    }
    return !input || Object.keys(input).length === 0;
}
exports.isTrue = input => input === true;
exports.isEqualToZero = input => input === 0;

exports.setSelectOp = (data, { value, label }) => {
    return data.map(d => {
        return { value: d[value], label: d[label] }
    })
}