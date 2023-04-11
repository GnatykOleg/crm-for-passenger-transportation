// Import required dependencies:

// Firebase
import { ConfirmationResult } from "@firebase/auth";

// Redux
import { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthSliceState {
  userId: null | string;
  nickname: null | string;
  stateChange: null | boolean;
  email: null | string | undefined;
  phoneNumber: null | string | undefined;
  role: null | string;
  loading: boolean;
  error: any;
}

export interface ITripsSliceState {
  trips: Array<IGetAllTrips> | null;
  loading: boolean;
  error: any;
}

export interface IUserDoc {
  displayName: string;
  docID: string;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  role: string;
  uid: string;
}

export interface IUsersSliceState {
  users: Array<IUserDoc> | null;
  drivers: Array<IUserDoc> | null;
  passangers: Array<IUserDoc> | null;
  tripsForDriver: Array<ITripsForRole> | null;
  tripsForPassanger: Array<ITripsForRole> | null;
  loading: boolean;
  error: any;
}

export interface IAuth {
  displayName: string | null;
  uid: string;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  role: string;
}

export type LoginPayload = PayloadAction<IAuth>;

export interface IOnAuthStateChangePayload {
  uid: string;
  displayName: string | null;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  stateChange: boolean;
  role: string;
}

export interface IRegistrationByEmailProps {
  email: string;
  password: string;
  nickname: string;
}

export interface IGetUserDoc {
  value: string | null | undefined;
  valueName: string;
}

export interface IPhoneAuthProps {
  OTP: string;
  captchaConfirmObj: ConfirmationResult | undefined;
}

export interface IState {
  auth: IAuthSliceState;
  users: IUsersSliceState;
  trips: ITripsSliceState;
}

export interface IAddTripInfo {
  carModel: string;
  carNumber: string;
  driver: string;
  driverID: string;
  from: string;
  to: string;
  passangersCount: string;
  passangersForTrip: Array<string>;
  tripStatus: boolean;
}

export interface IUpdateTripInfoProps extends IAddTripInfo {
  docID: string;
}

export interface ITripsForRole extends IAddTripInfo {
  docID: string;
}

export interface ITrip {
  carModel: string;
  from: string;
  to: string;
  carNumber: string;
  passangersCount: string;
  driver: string;
  passangersForTrip: Array<string>;
  tripStatus: boolean;
  driverID: string;
}

export interface IUpdateTripProps {
  docID: string;
  updatedTripInfo: ITrip;
}

export interface IGetAllTrips extends ITrip {
  docID: string;
}
