import React from 'react';
import { isEmpty } from '../../../helpers';
import { Card, CardBody } from 'reactstrap';

const thead = (data) => {
  return Object.keys(data).map((d) => {
    return <th> {data[d].preview} </th>;
  });
};

const tbody = (values, options) => {
  if (isEmpty(values)) return noContentFound();
  return values.map((v) => {
    return (
      <tr>
        {Object.keys(options).map((op) => {
          return <td>{v[op]}</td>;
        })}
      </tr>
    );
  });
};

const noContentFound = () => {
  return (
    <tr>
      <td colSpan="12">Sem dado.</td>
    </tr>
  );
};

export default function Index({ options, values, ...rest }) {
  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <table className="display table table-striped table-hover">
            <thead>
              <tr>{thead(options)}</tr>
            </thead>
            <tfoot>
              {values.length >= 10 ? <tr>{thead(options)}</tr> : ''}
            </tfoot>
            <tbody>{tbody(values, options)}</tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
