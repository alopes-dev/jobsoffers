import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

export default function ViewEnterprise() {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Solicitar Documentos</ModalHeader>
        <ModalBody>
         
        </ModalBody>
        <ModalFooter style={{ display: 'flex', flexDirection: 'row' }}>
         
        </ModalFooter>
      </Modal>
  )
}
