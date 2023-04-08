import { PayloadAction } from "@reduxjs/toolkit";

export interface IUserNameAndID {
  displayName: string | null;
  uid: string;
}

export type LoginPayload = PayloadAction<IUserNameAndID>;

export interface IInitialState {
  userId: null | string;
  nickname: null | string;
  loading: boolean;
  error: any;
}
