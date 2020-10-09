import { DEFAULT_URI, servicetypes } from './helpers';
import { isEmpty } from '../helpers';

var IService = (function() {
    function Service(uri = DEFAULT_URI) {
        this.uri = uri;
        this.table = '';
    }

    Service.prototype.join = async function(schema, table, isMutation) {
        let response = await fetch(this.uri, {
            method: 'post',
            body: JSON.stringify(schema),
            headers: { 'Content-Type': 'application/json' },
        });

        let result = await response.json();

        if (result.errors) {
            delete result.data;
            result.ok = false;
            return result;
        }
        result.ok = true;

        if (isEmpty(isMutation)) {
            result.data = result.data[table];
        }
        return result;
    };

    Service.prototype.onCreateSchema = function({
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
                if (useExclamation) {
                    exclamation = '!';
                }
                _Itable =
                    table.charAt(0).toLowerCase() + table.substr(1, table.length - 1);
                Itable =
                    table.charAt(0).toLocaleUpperCase() +
                    table.substr(1, table.length - 1);

                query = {
                    query: `mutation ${_Itable}Input($input: ${Itable}Input${exclamation}) { add${Itable}(input: $input) {${properties} } }`,
                    variables: { input: value },
                };

                return this.join(query, table, 'true');

            case servicetypes.UPDATE:
                if (useExclamation) {
                    exclamation = '!';
                }
                _Itable =
                    table.charAt(0).toLowerCase() +
                    table.substr(1, table.length - 1).toLowerCase();
                Itable =
                    table.charAt(0).toLocaleUpperCase() +
                    table.substr(1, table.length - 1).toLowerCase();

                query = {
                    query: `mutation ${_Itable}Input($input: ${Itable}Input${exclamation}) { update${Itable}(input: $input) {${properties} } }`,
                    variables: { input: value },
                };

                return this.join(query, table, 'true');

            case servicetypes.REMOVE:
                Itable =
                    table.charAt(0).toLocaleUpperCase() +
                    table.substr(1, table.length - 1).toLowerCase();

                query = {
                    query: `mutation { delete${Itable}(${getById.consts}: "${getById.value}") {${properties} } }`,
                };

                return this.join(query, table, 'true');
            default:
                break;
        }
    };

    Service.prototype.fetch = function(schema) {
        schema.type = servicetypes.FETCH;
        return this.onCreateSchema(schema);
    };

    Service.prototype.store = function(schema) {
        schema.type = servicetypes.STORE;
        return this.onCreateSchema(schema);
    };

    Service.prototype.update = function(schema) {
        schema.type = servicetypes.UPDATE;
        return this.onCreateSchema(schema);
    };

    Service.prototype.delete = function(schema) {
        schema.type = servicetypes.REMOVE;
        return this.onCreateSchema(schema);
    };

    Service.prototype.useGeneric = function({ query, variables }) {
        let schema;
        if (query === '') {
            return console.error('you must pass some string on the query property');
        }

        if (query !== undefined) {
            schema = { query, variables };
        } else {
            schema = { query };
        }

        return fetch(this.uri, {
            method: 'post',
            body: JSON.stringify(schema),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return Service;
})();

export default new IService();