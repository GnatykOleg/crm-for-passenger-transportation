// Import required dependencies:

// React
import React, { FC, useState } from "react";

// Components
import {
  Login,
  Registration,
  AuthByFacebook,
  AuthByGoogle,
  AuthByPhone,
  Slider,
} from "../../components";

// React bootstrap
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

// Declaring a PrivateRoute component
const AuthPage: FC = () => {
  // Local state

  // Set Sign IN
  const [showLogin, setShowLogin] = useState<boolean>(true);

  // Set Sign UP
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  // Switcher auth method sign in or sign up
  const authSwitcher = () => {
    setShowLogin((state) => !state);
    setShowSignUp((state) => !state);
  };

  // Button text with switcher
  const buttonText = showLogin
    ? "Don't have an account? Sign up"
    : "Have an account? Login";

  // Return JSX
  return (
    <>
      <section
        style={{
          maxHeight: "500px",
          boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Slider />
      </section>
      <section>
        <h1 className="my-5 text-center">
          Welcome to the passenger transportation platform!
        </h1>
        <Container>
          <Row>
            <Col>
              <Stack gap={2} className="col-md-5 mx-auto">
                {showLogin && <Login />}
                {showSignUp && <Registration />}
              </Stack>

              <Stack gap={2} className="mt-3 col-md-5 mx-auto">
                <Button variant="link" onClick={() => authSwitcher()}>
                  {buttonText}
                </Button>
              </Stack>

              <Stack gap={4} className="mt-5 col-md-5 mx-auto">
                <hr className="hr hr-blurry" />
                <h4 className="text-center">Alternative auth method</h4>

                <hr className="hr hr-blurry" />
                <h4 className="text-center">By socials</h4>

                <AuthByFacebook />

                <AuthByGoogle />

                <hr className="hr hr-blurry" />
                <h4 className="text-center">By phone number</h4>
                <AuthByPhone />
              </Stack>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

// Export the AuthPage component:
export default AuthPage;
