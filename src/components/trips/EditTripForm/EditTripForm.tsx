// Import required dependencies:

// React
import React, { FC, useState } from "react";

// Hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";

// Operations
import { updateTrip } from "../../../redux/trips/tripsOperations";

// Selectors
import {
  getDriversSelector,
  getPassangersSelector,
  getUsersLoadingStatusSelector,
} from "../../../redux/users/usersSelectors";

import { getAllTripsSelector } from "../../../redux/trips/tripsSelectors";

// Interfaces
import { TripSelectValue } from "../../../interfaces/components/trips-components-types";

// Components
import Loader from "../../common/Loader/Loader";

// React Bootstrap
import { Button, Card, Form, ListGroup } from "react-bootstrap";

// Libraries
import Switch from "react-switch";

import Select from "react-select";

import { toast } from "react-toastify";

// Declaring a EditTripForm component
const EditTripForm: FC<{ docID: string }> = ({ docID }: { docID: string }) => {
  // Get all trips from data
  const trips = useAppSelector(getAllTripsSelector);

  const tripDataToEdit = trips?.find((el: any) => el.docID === docID)!!;

  // Local state

  // Car model
  const [carModel, setCarModel] = useState<string>(tripDataToEdit.carModel);

  // Car Number
  const [carNumber, setCarNumber] = useState<string>(tripDataToEdit.carNumber);

  // Trip from location
  const [from, setFrom] = useState<string>(tripDataToEdit.from);

  // Trip to location
  const [to, setTo] = useState<string>(tripDataToEdit.to);

  // Passangers count
  const [passangersCount, setPassangersCount] = useState<string>(
    tripDataToEdit.passangersCount
  );

  // Passangers for a trip
  const [passangersForTrip, setPassangersForTrip] = useState<string[] | []>(
    tripDataToEdit.passangersForTrip
  );

  // Driver
  const [driver, setDriver] = useState<string>(tripDataToEdit.driver);

  // Driver ID
  const [driverID, setDriverID] = useState<string>(tripDataToEdit.driverID);

  // Trip status
  const [tripStatus, setTripStatus] = useState<boolean>(
    tripDataToEdit.tripStatus
  );

  // Get dispatch from useAppDispatch hook
  const dispatch = useAppDispatch();

  // Get drivers for choice
  const drivers = useAppSelector(getDriversSelector);

  // Get passangers for choice
  const passangers = useAppSelector(getPassangersSelector);

  // Get loading status for render Loader
  const loading = useAppSelector(getUsersLoadingStatusSelector);

  // Create drivers options for react select
  const driversOptions = drivers?.map(({ displayName, uid }) => ({
    value: uid,
    label: displayName,
  }));

  // Create passangers options for react select
  const passangersOptions = passangers?.map(({ displayName, uid }) => ({
    value: uid,
    label: displayName,
  }));

  // On change select drivers
  const onChangeDrivers = (value: TripSelectValue) => {
    setDriverID(value!.value);
    setDriver(value!.label);
  };

  // On change select passangers
  const onChangePassangers = (value: TripSelectValue) =>
    setPassangersForTrip((prevState: string[]) => {
      // Set new state
      const updateState = [...prevState, value!.label];

      // Return only Unique values
      return [...new Set(updateState)];
    });

  // On click from list passangers to delete passanger
  const deletePassanger = (passanger: string) =>
    setPassangersForTrip((prevState) =>
      prevState.filter((_, i, arr) => arr.indexOf(passanger) !== i)
    );

  // On form submit
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent form
    e.preventDefault();

    // Checking if there are more passengers than the car can hold
    if (passangersForTrip.length > Number(passangersCount))
      return toast.warn("There are more passengers than a car can take");

    // Update trip to redux
    dispatch(
      updateTrip({
        docID,
        updatedTripInfo: {
          carModel,
          from,
          to,
          carNumber,
          passangersCount,
          driver,
          passangersForTrip,
          tripStatus,
          driverID,
        },
      })
    );
  };

  // If loading true return loader
  if (loading) return <Loader />;

  // Return JSX
  return (
    <>
      <Form
        style={{ width: "100%", maxWidth: "550px" }}
        onSubmit={onFormSubmit}
      >
        <Form.Group className="mb-3 " controlId="formBasicCarModel">
          <Form.Label>Сar model</Form.Label>
          <Form.Control
            onChange={(e) => setCarModel(e.currentTarget.value)}
            type="text"
            placeholder="Enter car model"
            value={carModel}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFrom">
          <Form.Label>From</Form.Label>

          <Form.Control
            onChange={(e) => setFrom(e.currentTarget.value)}
            type="text"
            placeholder="Enter place of departure"
            value={from}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTo">
          <Form.Label>To</Form.Label>
          <Form.Control
            onChange={(e) => setTo(e.currentTarget.value)}
            type="text"
            placeholder="Enter destination"
            value={to}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCarNumber">
          <Form.Label>Car number</Form.Label>
          <Form.Control
            onChange={(e) => setCarNumber(e.currentTarget.value)}
            type="text"
            placeholder="Enter car number"
            value={carNumber}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassangersCount">
          <Form.Label>Passangers count</Form.Label>
          <Form.Control
            onChange={(e) => setPassangersCount(e.currentTarget.value)}
            type="number"
            placeholder="Enter passangers count"
            value={passangersCount}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassangersCount">
          <Form.Label>Drivers</Form.Label>
          <Select
            onChange={onChangeDrivers}
            name="drivers"
            noOptionsMessage={() => "Not selected driver"}
            options={driversOptions}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassangersCount">
          <Form.Label>Passangers</Form.Label>
          <Select
            onChange={onChangePassangers}
            name="passangers"
            noOptionsMessage={() => "Not selected driver"}
            options={passangersOptions}
          />
        </Form.Group>

        <Card className="mb-5">
          <Card.Header>Added passangers:</Card.Header>
          <ListGroup variant="flush">
            {passangersForTrip.map((value) => {
              return (
                <>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Passanger: {value}</span>
                    <Button
                      variant="outline-danger"
                      onClick={() => deletePassanger(value)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                </>
              );
            })}
          </ListGroup>
        </Card>

        <div className="d-flex justify-content-between align-items-center">
          <label className="d-flex">
            <span className="me-3">{tripStatus ? "Completed" : "Waiting"}</span>
            <p>{tripStatus}</p>
            <Switch
              onChange={() => setTripStatus((state) => !state)}
              checked={tripStatus}
            />
          </label>
          <Button variant="primary" type="submit">
            Update trip
          </Button>
        </div>
      </Form>
    </>
  );
};

// Export the EditTripFormTEST component:
export default EditTripForm;
