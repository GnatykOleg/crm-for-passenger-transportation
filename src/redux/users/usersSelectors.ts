// Interfaces
import {
  IState,
  ITripsForDriver,
  IUserDoc,
} from "../../interfaces/redux-types";

// Get users data from redux state
export const getAllUsersSelector = (state: IState): IUserDoc[] | null =>
  state.users.users;

// Get drivers data from redux state
export const getDriversSelector = (state: IState): IUserDoc[] | null =>
  state.users.drivers;

// Get passangers data from redux state
export const getPassangersSelector = (state: IState): IUserDoc[] | null =>
  state.users.passangers;

// Get trips for driver data from redux state
export const getTripsForDriverSelectore = (
  state: IState
): ITripsForDriver[] | null => state.users.tripsForDriver;

// Get trips for driver data from redux state
export const getUsersLoadingStatusSelector = (state: IState) =>
  state.users.loading;
