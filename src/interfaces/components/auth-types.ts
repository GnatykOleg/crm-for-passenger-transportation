import { Dispatch, AsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { ConfirmationResult } from "firebase/auth";

export type InputEvent = React.ChangeEvent<HTMLInputElement>;

type AsyncThunkType = AsyncThunk<
  any,
  any,
  {
    rejectValue: string;
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
  }
>;

export interface IAuthByEmail {
  isRegistration?: boolean;
  authMehod: AsyncThunkType;
  submitButtonText: string;
}

export interface IGetOTPFormProps {
  setUpRecaptcha: (
    phoneNumber: string
  ) => Promise<ConfirmationResult | undefined>;
}

export interface IConfirmOTPFormProps {
  captchaConfirmObj: ConfirmationResult | undefined;
}
