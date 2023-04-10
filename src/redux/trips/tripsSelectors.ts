// Interfaces
import { IGetAllTrips, IState } from "../../interfaces/redux-types";

export const getAllTripsSelector = (state: IState): IGetAllTrips[] | null =>
  state.trips.trips;
