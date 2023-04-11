// Import required dependencies:

// React
import React, { FC, useEffect, useState } from "react";

// Redux
import { nanoid } from "@reduxjs/toolkit";

// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

// Operations
import { getAllUsers } from "../../redux/users/usersOperations";

// Redux Selectors
import {
  getAllUsersSelector,
  getUsersLoadingStatusSelector,
} from "../../redux/users/usersSelectors";

// React botstrap
import { Container, Row, Col } from "react-bootstrap";

// Components
import {
  SetUserRoleForm,
  Loader,
  UserCard,
  Navigation,
} from "../../components";

// Constants
import { ROLES } from "../../consts/roles";

// Interfaces
import { IEditUserData } from "../../interfaces/components/users-components-types";

// Styles module
import s from "./AdminPage.module.css";

// Declaring a AdminPage component
const AdminPage: FC = () => {
  // Local state

  // Show change user role modal
  const [show, setShow] = useState<boolean>(false);

  // User data for change role
  const [user, setUser] = useState<IEditUserData>({
    displayName: "",
    role: "",
    phoneNumber: "",
    email: "",
  });

  // Get dispatch from useAppDispatch
  const dispatch = useAppDispatch();

  // Handle shoe/open modal
  const handleShowModal = () => setShow((state) => !state);

  // Get users data from redux
  const users = useAppSelector(getAllUsersSelector);

  // Get users loadin status
  const usersLoadingStatus = useAppSelector(getUsersLoadingStatusSelector);

  // Get all users
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Edit button on card
  const onClick = ({
    displayName,
    role,
    phoneNumber,
    email,
  }: IEditUserData) => {
    // Set data for change user role modal
    setUser({ displayName, role, phoneNumber, email });

    // Open modal
    handleShowModal();
  };

  // If loading true return loader
  if (usersLoadingStatus) return <Loader />;

  // Return JSX
  return (
    <>
      <Navigation />
      <section className={s.section}>
        <h2 className="text-center mb-5">Administrator Page</h2>

        {users && users.length > 0 ? (
          <Container>
            <Row>
              {users
                // All cards without admin card
                ?.filter(({ role }) => role !== ROLES.ADMIN)
                .map((userData) => {
                  return (
                    <Col key={nanoid()} sm={12} md={6} xl={3} className="mb-3">
                      <UserCard userData={userData} onClick={onClick} />
                    </Col>
                  );
                })}
            </Row>
          </Container>
        ) : (
          <h3 className="text-center mb-5">Sorry no users</h3>
        )}

        {/* Change user role form */}
        <SetUserRoleForm
          show={show}
          handleShowModal={handleShowModal}
          user={user}
        />
      </section>
    </>
  );
};

// Export the AdminPage component:
export default AdminPage;
