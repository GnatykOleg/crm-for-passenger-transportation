// Import required dependencies:

// React
import React, { FC, useState } from "react";

// React router dom
import { NavLink } from "react-router-dom";

// Hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";

// Selectors
import { authDataSelector } from "../../../redux/auth/authSelectors";

// Operation
import { handleSignOut } from "../../../redux/auth/authOpertions";

// Contants
import { ROUTES } from "../../../consts/routes";

// Components
import { ChangeNickNameForm } from "../..";

import MyModal from "../MyModal/MyModal";

// React bootstrap
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

// React icons
import { BsTaxiFront } from "react-icons/bs";

// Declaring a Navigation component
const Navigation: FC = () => {
  // Local state

  // Show change nickname modal
  const [show, setShow] = useState<boolean>(false);

  // Get dispatch from useAppDispatch
  const dispatch = useAppDispatch();

  // Get auth data from redux
  const auth = useAppSelector(authDataSelector);

  // Switcher open close modal
  const handleShowModal = () => setShow((state) => !state);

  // Destructuring values from auth
  const { nickname, email, phoneNumber, role, userId } = auth;

  // Return JSX
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <span className="me-2"> Ride Cargo</span>
            <BsTaxiFront />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" variant="tabs">
              <Nav.Link eventKey={ROUTES.TRIPS} as={NavLink} to={ROUTES.TRIPS}>
                Trips
              </Nav.Link>
              <Nav.Link
                eventKey={ROUTES.DISPATCHER}
                as={NavLink}
                to={ROUTES.DISPATCHER}
              >
                Dispatcher
              </Nav.Link>
              <Nav.Link
                eventKey={ROUTES.DRIVER}
                as={NavLink}
                to={ROUTES.DRIVER}
              >
                Driver
              </Nav.Link>
              <Nav.Link
                eventKey={ROUTES.PASSANGER}
                as={NavLink}
                to={ROUTES.PASSANGER}
              >
                Passanger
              </Nav.Link>
              <Nav.Link eventKey={ROUTES.ADMIN} as={NavLink} to={ROUTES.ADMIN}>
                Admin
              </Nav.Link>

              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as="p">
                  ID: <strong>{userId}</strong>
                </NavDropdown.Item>

                <NavDropdown.Item as="p">
                  Nickname: <strong>{nickname}</strong>
                </NavDropdown.Item>

                <NavDropdown.Item as="p">
                  Role: <strong className="text-info">{role}</strong>
                </NavDropdown.Item>

                {email && (
                  <NavDropdown.Item as="p">
                    Email: <strong>{email}</strong>
                  </NavDropdown.Item>
                )}

                {phoneNumber && (
                  <NavDropdown.Item as="p">
                    Phone number: <strong>{phoneNumber}</strong>
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />

                <NavDropdown.Item as="button" onClick={() => setShow(true)}>
                  Change nickname
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  as="button"
                  onClick={() => dispatch(handleSignOut())}
                >
                  Exit
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Edit nickname modal */}
      <MyModal
        handleShowModal={handleShowModal}
        title="Change nickname"
        show={show}
      >
        <ChangeNickNameForm />
      </MyModal>
    </>
  );
};

// Export the Navigation component:
export default Navigation;
