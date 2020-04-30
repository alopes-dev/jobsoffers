import { DEFAULT_URI, servicetypes } from './helpers';
import { isEmpty } from '~/generics';

var IService = (function () {
  function Service(uri = DEFAULT_URI) {
    this.uri = uri;
    this.table = '';
  }

  Service.prototype.join = async function (schema, table, isMutation) {
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

  Service.prototype.onCreateSchema = function ({
    value,
    useExclamation,
    getById,
    type,
    table,
    properties,
  }) {
    this.table = table;
    let query = null;
    switch (type) {
      case servicetypes.FETCH:
        if (!isEmpty(getById)) {
          getById = `(${getById.field}:"${getById.value}")`;
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

  Service.prototype.fetch = function (schema) {
    schema.type = servicetypes.FETCH;
    return this.onCreateSchema(schema);
  };

  Service.prototype.store = function (schema) {
    schema.type = servicetypes.STORE;
    return this.onCreateSchema(schema);
  };

  return Service;
})();

export default new IService();
