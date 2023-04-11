// Import required dependencies:

// React
import React, { FC, useEffect, useState } from "react";

// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

// Operations
import { deleteTrip, getAllTrips } from "../../redux/trips/tripsOperations";

// Selectors
import {
  getAllTripsLoadingSelector,
  getAllTripsSelector,
} from "../../redux/trips/tripsSelectors";

// Redux
import { nanoid } from "@reduxjs/toolkit";

// Components
import {
  MyModal,
  EditTripForm,
  TripCard,
  Loader,
  Navigation,
} from "../../components";

// React Bootstrap

import { Button, Col, Container, Pagination, Row } from "react-bootstrap";

// Import styles module
import s from "./TripsPage.module.css";

// Declaring a TripsPage component
const TripsPage: FC = () => {
  // Locat state

  // State for open delete modal
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  // State for open edit modal
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  // State for document id
  const [docID, setDocID] = useState<string>("");

  // Get dispatch from useAppDispatch hook
  const dispatch = useAppDispatch();

  // Get all trips
  const trips = useAppSelector(getAllTripsSelector);

  // Get loading status
  const loading = useAppSelector(getAllTripsLoadingSelector);

  // Open confirm delete modal, and set document id to local state
  const handleOpenDelete = (docmentID: string) => {
    setOpenDelete(true);
    setDocID(docmentID);
  };

  // Open confirm edit modal, and set document id to local state
  const handleOpenEdit = (docmentID: string) => {
    setOpenEdit(true);
    setDocID(docmentID);
  };

  // Confirm delete in modal, close confirm modal
  const onDeleteClick = () => {
    dispatch(deleteTrip(docID));
    setOpenDelete(false);
  };

  // Get data
  useEffect(() => {
    dispatch(getAllTrips());
  }, [dispatch]);

  // if loading true return loader
  if (loading) return <Loader />;

  // Return JSX
  return (
    <>
      <Navigation />
      <section className={s.section}>
        <h2 className="text-center mb-5">Trips Page</h2>

        {trips && trips.length > 0 ? (
          <Container>
            <Row>
              {trips?.map((tripData) => {
                return (
                  <Col key={nanoid()} sm={12} md={6} xl={3} className="mb-3">
                    <TripCard
                      tripData={tripData}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenEdit={handleOpenEdit}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        ) : (
          <h3 className="text-center mb-5">Sorry no trips yet</h3>
        )}

        {/* Modals */}

        {/* Confrim delete modal */}
        <MyModal
          show={openDelete}
          title="Are you sure to want delete a trip?"
          handleShowModal={() => setOpenDelete(false)}
        >
          <div className="d-flex justify-content-between">
            <Button onClick={onDeleteClick} variant="outline-danger">
              Delete
            </Button>
            <Button onClick={() => setOpenDelete(false)} variant="primary">
              Close
            </Button>
          </div>
        </MyModal>

        {/* Edit modal */}
        <MyModal
          show={openEdit}
          title="Edit trip"
          handleShowModal={() => setOpenEdit(false)}
        >
          <EditTripForm docID={docID} />
        </MyModal>
      </section>
    </>
  );
};

// Export the TripsPage component:
export default TripsPage;
