/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { DEFAULT_URI, servicetypes } from './helpers';
import { isEmpty } from '~/generics';

var IService = (function() {
    function IService(uri = DEFAULT_URI) {
        this.uri = uri;
        this.table = '';
    }

    IService.prototype.join = async function(schema, table, isMutation) {
        let response = await fetch(this.uri, {
            method: 'post',
            body: JSON.stringify(schema),
            headers: { 'Content-Type': 'application/json' },
        });
        let result = await response.json();
        console.log(result);
        result.ok = response.ok;
        if (!response.ok) {
            return result;
        }
        if (isEmpty(isMutation)) {
            result.data = result.data[table];
        }
        return result;
    };

    IService.prototype.onCreateSchema = function({
        value,
        useExclamation,
        getById,
        type,
        table,
        properties,
    }) {
        this.table = table;
        let query = null;
        let _Itable = '',
            Itable = '',
            exclamation = '';
        switch (type) {
            case servicetypes.FETCH:
                if (!isEmpty(getById)) {
                    getById = `(Consts:"${getById.consts}", ${getById.field}:"${getById.value}")`;
                } else {
                    getById = '';
                }
                query = { query: `{${table}${getById}{${properties}}}` };
                return this.join(query, table, undefined);
            case servicetypes.STORE:
                let exclamation = '';
                if (useExclamation) {
                    exclamation = '!';
                }
                let _Itable =
                    table.charAt(0).toLowerCase() +
                    table.substr(1, table.length - 1).toLowerCase();
                let Itable =
                    table.charAt(0).toLocaleUpperCase() +
                    table.substr(1, table.length - 1).toLowerCase();

                query = {
                    query: `mutation ${_Itable}Input($input: ${Itable}Input${exclamation}) { add${Itable}(input: $input) {${properties} } }`,
                    variables: { input: value },
                };
                return this.join(query, table, 'true');
            default:
                break;
        }
    };

    IService.prototype.fetch = function(schema) {
        schema.type = servicetypes.FETCH;
        return this.onCreateSchema(schema);
    };

    IService.prototype.store = function(schema) {
        schema.type = servicetypes.STORE;
        return this.onCreateSchema(schema);
    };

    return IService;
})();

// var test = new IService()

// test.fetch()

export default new IService();