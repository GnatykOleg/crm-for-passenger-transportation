// Interfaces
import { IState, IUsersSliceState } from "../../interfaces/redux-types";

// Get users data from redux state
export const usersDataSelector = (state: IState): IUsersSliceState =>
  state.users;

export const getDriversSelector = (state: IState) => state.users.drivers;

export const getPassangersSelector = (state: IState) => state.users.passangers;

export const getTripsForDriver = (state: IState) => state.users.tripsForDriver;
