// Import required dependencies:
import React, { FC } from "react";

// Interfaces
import { IUserCardProps } from "../../../interfaces/components/users-components-types";

// React Bootstrap
import { Button, Card, ListGroup } from "react-bootstrap";

// Declaring a UserCard component using the props type from the IUserCardProps interface:
const UserCard: FC<IUserCardProps> = ({
  userData,
  onClick,
}: IUserCardProps) => {
  // Destructuring values from user data
  const { displayName, role, email, phoneNumber, docID, uid } = userData;

  // Return JSX
  return (
    <Card className="h-100" border="info">
      <Card.Header>{displayName}</Card.Header>
      <Card.Body>
        <Card.Title>Role: {role}</Card.Title>

        <ListGroup variant="flush">
          <ListGroup.Item>Document ID: {docID}</ListGroup.Item>

          <ListGroup.Item>User ID: {uid}</ListGroup.Item>

          {/* If the user logs in using a phone number, he does not have an email */}
          {email && <ListGroup.Item>Email: {email}</ListGroup.Item>}

          {phoneNumber && (
            <ListGroup.Item>Phone Number: {phoneNumber}</ListGroup.Item>
          )}
        </ListGroup>

        <Button
          className="d-block mx-auto mt-3"
          // Set data for change user form for admin
          onClick={() => onClick({ displayName, role, phoneNumber, email })}
        >
          Change Role
        </Button>
      </Card.Body>
    </Card>
  );
};

// Export the UserCard component:
export default UserCard;
