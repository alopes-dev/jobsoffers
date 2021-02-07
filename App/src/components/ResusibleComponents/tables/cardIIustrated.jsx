import React from 'react';
import { isEmpty } from '../../../helpers';

export default function CardIIustrated(props) {
  const items = (options) => {
    return !isEmpty(options)
      ? options.map((op, i) => {
          return (
            <div className="col-sm-6 col-md-3" key={i}>
              <div className="card card-stats card-round">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-5">
                      <div className="icon-big text-center">
                        <i className={`${op.icon}`}></i>
                      </div>
                    </div>
                    <div className="col-7 col-stats">
                      <div className="numbers">
                        <p className="card-category">{op.name}</p>
                        <h4 className="card-title"> {op.value}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : [];
  };

  return <div className="row">{items(props.options)}</div>;
}
