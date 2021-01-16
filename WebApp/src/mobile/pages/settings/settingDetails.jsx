import React, { useState, useRef } from 'react';
import { Modal, Button } from 'reactstrap';
import { Form } from '@unform/core';

const SettingDetails = ({ details, title, callback, componentRender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [info, setInfo] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const formRef = useRef(null);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleShowList = () => {
    setShowList(!showList);
  };

  const handleSubmit = (data, { reset }) => {
    callback(data, isUpdate);
  };

  return (
    <>
      <li>
        <span className="name-specification">{title}</span>
        <span className="status-specification">
          {`${details[0]?.Percentagem}% de ${details[0]?.Designacao}`}{' '}
          <i
            className="flaticon-down-arrow-1 ml-3"
            onClick={() => {
              toggleShowList();
            }}
          ></i>
          <i
            className="flaticon-add ml-3"
            onClick={() => {
              setInfo(`Adicionar ${title}`);
              setIsUpdate(false);
              toggleModal();
            }}
          ></i>
        </span>
        {showList && (
          <ul className="specification-list" style={{ width: '80%' }}>
            {details.map((detail, i) => (
              <li className="inner-list" key={i}>
                <span className="status-specification">
                  {`${detail?.Percentagem}% de ${detail?.Designacao}`}{' '}
                  <i
                    className="flaticon-pen ml-2"
                    onClick={async () => {
                      setIsUpdate(true);
                      setInfo(`Atualizar ${title}`);
                      toggleModal();
                    }}
                  ></i>
                  <i
                    className="flaticon-cross text-danger ml-2"
                    onClick={() => {
                      //   setInfo(`Atualizar ${title}`);
                      //   toggleModal();
                    }}
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        )}
      </li>
      <Modal
        className="modal-dialog-centered modal-xl"
        md="12"
        scrollable={true}
        isOpen={isOpen}
        toggle={() => toggleModal()}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            {info}
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => {
              toggleModal();
            }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Form ref={formRef} onSubmit={handleSubmit}>
            {componentRender}
          </Form>
          <Button
            size="sm"
            color="primary"
            type="button"
            onClick={() => formRef.current.submitForm()}
          >
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SettingDetails;
