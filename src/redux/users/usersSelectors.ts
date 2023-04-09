// Interfaces
import { IState, IUsersSliceState } from "../../interfaces/redux-types";

// Get users data from redux state
export const usersDataSelector = (state: IState): IUsersSliceState =>
  state.users;
