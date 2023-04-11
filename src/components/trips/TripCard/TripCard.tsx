// Import required dependencies:

// React
import React, { FC } from "react";

// Hooks
import { useAppSelector } from "../../../hooks/redux-hooks";

// Selectors
import { authDataSelector } from "../../../redux/auth/authSelectors";

// Constants
import { ROLES } from "../../../consts/roles";

// Redux
import { nanoid } from "@reduxjs/toolkit";

// Interfaces
import { ITripCardProps } from "../../../interfaces/components/trips-components-types";

// React Bootstrap
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

// Switch library
import Switch from "react-switch";

// Declaring a TripCard component using the props type from the ITripCardProps interface:
const TripCard: FC<ITripCardProps> = ({
  tripData,
  handleOpenDelete,
  handleOpenEdit,
}: ITripCardProps) => {
  // Get role from auth redux
  const { role } = useAppSelector(authDataSelector);

  // Вestructuring values from ROLES
  const { ADMIN, DISPATCHER } = ROLES;

  // Вestructuring values from tripData
  const {
    docID,
    passangersCount,
    passangersForTrip,
    carModel,
    carNumber,
    driver,
    from,
    to,
    tripStatus,
  } = tripData;

  // Create access const for only ADMIN or DISPATCHER render components
  const access = role === ADMIN || role === DISPATCHER;

  // Create free seats in a trip count
  const freeSeats = Number(passangersCount) - passangersForTrip.length;

  // Return JSX
  return (
    <Card className="h-100" border="info">
      <Card.Header>ID: {docID}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          From: <strong>{from}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          To: <strong>{to}</strong>
        </ListGroup.Item>

        <ListGroup.Item>
          Passangers count: <strong>{passangersCount}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          Free seats: <strong>{freeSeats}</strong>
        </ListGroup.Item>

        <ListGroup.Item>
          Car model: <strong>{carModel}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          Car number: <strong>{carNumber}</strong>
        </ListGroup.Item>

        <ListGroup.Item>
          Driver: <strong>{driver}</strong>
        </ListGroup.Item>

        <ListGroupItem className="d-flex align-items-center justify-content-between">
          <span>Status: {tripStatus ? "Completed" : "Waiting..."}</span>
          <Switch onChange={() => {}} disabled checked={tripStatus} />
        </ListGroupItem>

        {/* Access to Passangers list only for DISPATCHER and ADMIN */}
        {access &&
          passangersForTrip?.map((passanger) => (
            <ListGroup.Item key={nanoid()}>
              Passanger: <strong>{passanger}</strong>
            </ListGroup.Item>
          ))}

        {/* Access to buttons EDIT and DELETE only for DISPATCHER and ADMIN */}
        {access && (
          <ListGroup.Item className="d-flex justify-content-between">
            <Button onClick={() => handleOpenEdit(docID)} variant="primary">
              Edit
            </Button>

            <Button
              onClick={() => handleOpenDelete(docID)}
              variant="outline-danger"
            >
              Delete trip
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

// Export the TripCard component:
export default TripCard;
