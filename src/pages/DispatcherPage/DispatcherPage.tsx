// Import required dependencies:

// React
import React, { FC } from "react";

// Components
import { AddTripForm } from "../../components";

// React Bootstrap
import { Container, Row, Col } from "react-bootstrap";

// Styles module
import s from "./DispatcherPage.module.css";

// Declaring a DispatcherPage component
const DispatcherPage: FC = () => {
  return (
    <section className={s.section}>
      <h2 className="text-center mb-5">Dispatcher Page</h2>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <AddTripForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Export the DispatcherPage component:
export default DispatcherPage;
