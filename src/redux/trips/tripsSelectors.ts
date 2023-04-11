// Interfaces
import { IGetAllTrips, IState } from "../../interfaces/redux-types";

export const getAllTripsSelector = (state: IState): IGetAllTrips[] | null =>
  state.trips.trips;

export const getAllTripsLoadingSelector = (state: IState): boolean =>
  state.trips.loading;
