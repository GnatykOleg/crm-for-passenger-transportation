// Import required dependencies:

// React
import React, { FC, useEffect, useState } from "react";

// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

// Selectors
import {
  getTripsForDriverSelectore,
  getUsersLoadingStatusSelector,
} from "../../redux/users/usersSelectors";

import { authDataSelector } from "../../redux/auth/authSelectors";

// Operations
import { getTripsForDriver } from "../../redux/users/usersOperations";

// Redux
import { nanoid } from "@reduxjs/toolkit";

// Components
import { Loader, Navigation, TripCard } from "../../components";

// React bootstrap
import { Button, Col, Container, Row } from "react-bootstrap";

// Styles module
import s from "./DriverPage.module.css";

// Declaring a DriverPage component
const DriverPage: FC = () => {
  // Local state

  // Waiting trips of driver
  const [waitingTrips, setWaitingTrips] = useState<boolean>(true);

  // Get all trips for driver
  const tripsForDriver = useAppSelector(getTripsForDriverSelectore);

  // Get loading status
  const loading = useAppSelector(getUsersLoadingStatusSelector);

  // Get driver id from redux
  const { userId } = useAppSelector(authDataSelector);

  // Get dispatch from useAppDispatch hook
  const dispatch = useAppDispatch();

  // Fetch trips for drivers
  useEffect(() => {
    if (userId) dispatch(getTripsForDriver(userId));
  }, [dispatch, userId]);

  // Filter trips to waiting
  const tripsToWaiting = tripsForDriver?.filter(
    ({ tripStatus }) => !tripStatus
  );

  // Filter completed trips
  const completedTrips = tripsForDriver?.filter(({ tripStatus }) => tripStatus);

  // Resulted data
  const data = waitingTrips ? tripsToWaiting : completedTrips;

  // If Loading true retrun loader
  if (loading) return <Loader />;

  // Return JSX
  return (
    <>
      <Navigation />
      <section className={s.section}>
        <h2 className="text-center mb-5">Driver Page</h2>

        {data && data.length > 0 ? (
          <>
            <Button
              className="d-block mx-auto mb-5"
              size="lg"
              variant="outline-info"
              // Switch if driver want see completed or waiting trips
              onClick={() => setWaitingTrips((state) => !state)}
            >
              {waitingTrips ? "Show completed trips" : "Waiting trips..."}
            </Button>
            <Container>
              <Row>
                {data?.map((tripData) => {
                  return (
                    <Col key={nanoid()} sm={12} md={6} xl={3} className="mb-3">
                      <TripCard tripData={tripData} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </>
        ) : (
          <h3 className="text-center mb-5">You don't have trips</h3>
        )}
      </section>
    </>
  );
};

// Export the DriverPage component:
export default DriverPage;
