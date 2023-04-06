import React, { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Container } from "react-bootstrap";

const PageNotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <img
        src={
          "https://pixabay.com/static/uploads/blog/post/2016/01/08/23-16-42-822_640.png"
        }
        alt="Page Not Found"
        width={800}
        style={{ paddingTop: 40, marginBottom: 40 }}
      />

      <Button onClick={() => navigate("/")}>Go to Home Page</Button>
    </Container>
  );
};

export default PageNotFound;
