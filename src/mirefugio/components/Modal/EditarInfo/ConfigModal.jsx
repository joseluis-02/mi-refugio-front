import React from "react";
import { Button, Col, FloatingLabel, Form, InputGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ConfigModal(props) {
  const { show, setShow, title, children } = props;
  console.log("entró en el modal");

  return (
      <Modal
      className="config-modal"
      show={show}
      backdrop="static"
      onHide={() => setShow(false)}
      centered
      size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
  );
}
