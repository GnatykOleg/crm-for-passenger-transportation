// Import required dependencies:

// React
import React, { FC } from "react";

// Interfaces
import { ImyModalProps } from "../../../interfaces/components/common-components-types";

// React Bootstrap
import { Modal } from "react-bootstrap";

// Declaring a MyModal component using the props type from the ImyModalProps interface:
const MyModal: FC<ImyModalProps> = ({
  show,
  handleShowModal,
  title,
  children,
}: ImyModalProps) => {
  return (
    <Modal show={show} onHide={handleShowModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

// Export the MyModal component:
export default MyModal;
