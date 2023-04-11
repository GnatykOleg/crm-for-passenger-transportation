// Import required dependencies:

// React
import React, { FC } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// React Bootstrap
import { Button, Container } from "react-bootstrap";

// Image
import notFoundImage from "../../assets/images/page-not-found.png";

// Declaring a PageNotFound component
const PageNotFound: FC = () => {
  // Get navigate from useNavigate
  const navigate = useNavigate();

  // Return JSX
  return (
    <Container>
      <img
        className="pt-5 mb-5 mx-auto"
        src={notFoundImage}
        alt="Page Not Found"
        width={800}
      />

      <Button className="d-block mx-auto" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Container>
  );
};

// Export the PageNotFound component:
export default PageNotFound;
