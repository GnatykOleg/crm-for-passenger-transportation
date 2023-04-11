// Import required dependencies:

// React
import React, { FC, useEffect, useState } from "react";

// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

// Selectors
import {
  getTripsForPassangerSelectore,
  getUsersLoadingStatusSelector,
} from "../../redux/users/usersSelectors";

import { authDataSelector } from "../../redux/auth/authSelectors";

// Operations
import { getTripsForPassanger } from "../../redux/users/usersOperations";

// Redux
import { nanoid } from "@reduxjs/toolkit";

// Components
import { Loader, Navigation, TripCard } from "../../components";

// React bootstrap
import { Button, Col, Container, Row } from "react-bootstrap";

// Styles module
import s from "./PassangerPage.module.css";

// Declaring a PassangerPage component
const PassangerPage: FC = () => {
  // Local state

  // Waiting trips of passanger
  const [waitingTrips, setWaitingTrips] = useState<boolean>(true);

  // Get all trips for passanger
  const tripsForPassanger = useAppSelector(getTripsForPassangerSelectore);

  console.log("tripsForPassanger", tripsForPassanger);

  // Get loading status
  const loading = useAppSelector(getUsersLoadingStatusSelector);

  // Get passanger id from redux
  const { userId } = useAppSelector(authDataSelector);

  // Get dispatch from useAppDispatch hook
  const dispatch = useAppDispatch();

  // Fetch trips for passanger
  useEffect(() => {
    if (userId) dispatch(getTripsForPassanger(userId));
  }, [dispatch, userId]);

  // Filter trips to waiting
  const tripsToWaiting = tripsForPassanger?.filter(
    ({ tripStatus }) => !tripStatus
  );

  // Filter completed trips
  const completedTrips = tripsForPassanger?.filter(
    ({ tripStatus }) => tripStatus
  );

  // Resulted data
  const data = waitingTrips ? tripsToWaiting : completedTrips;

  // If Loading true retrun loader
  if (loading) return <Loader />;

  // Return JSX
  return (
    <>
      <Navigation />
      <section className={s.section}>
        <h2 className="text-center mb-5">Passanger Page</h2>
        {data && data.length > 0 ? (
          <>
            <Button
              className="d-block mx-auto mb-5"
              size="lg"
              variant="outline-info"
              // Switch if passanger want see completed or waiting trips
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

// Export the PassangerPage component:
export default PassangerPage;
