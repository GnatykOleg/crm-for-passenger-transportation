// Import required dependencies:

// Firebase
import { ConfirmationResult } from "@firebase/auth";

// Redux
import { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthSliceState {
  userId: null | string;
  nickname: null | string;
  stateChange: null | boolean;
  email: null | string;
  role: null | string;
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
  loading: boolean;
  error: any;
}

export interface IUser {
  displayName: string | null;
  uid: string;
  email: string | null;
  role: string;
}

export type LoginPayload = PayloadAction<IUser>;

export interface IOnAuthStateChangePayload {
  uid: string;
  displayName: string | null;
  email: string | null;
  stateChange: boolean;
  role: string;
}

export interface IRegistrationByEmailProps {
  email: string;
  password: string;
  nickname: string;
}

export interface IGetUserDoc {
  value: string | null;
  valueName: string;
}

export interface IPhoneAuthProps {
  OTP: string;
  captchaConfirmObj: ConfirmationResult | undefined;
}

export interface IState {
  auth: IAuthSliceState;
  users: IUsersSliceState;
}
