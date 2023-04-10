// Interfaces
import { IAuthSliceState, IState } from "../../interfaces/redux-types";

export const authDataSelector = (state: IState): IAuthSliceState => state.auth;
