import { createSlice } from "@reduxjs/toolkit";

import {
  facebookAuth,
  googleAuth,
  phoneAuth,
  loginByEmail,
  registrationByEmail,
  handleSignOut,
} from "./authOpertions";

import { IInitialState, LoginPayload } from "../../interfaces/redux-types";

const initialState: IInitialState = {
  userId: null,
  nickname: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // USER REGISTRATION EMAIL
    builder.addCase(registrationByEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registrationByEmail.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.loading = false;
      }
    );
    builder.addCase(registrationByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // USER LOGIN EMAIL
    builder.addCase(loginByEmail.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginByEmail.fulfilled,
      (state, { payload }: LoginPayload) => {
        console.log("payload", payload);
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.loading = false;
      }
    );
    builder.addCase(loginByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // GOOGLE AUTH
    builder.addCase(googleAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      googleAuth.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.loading = false;
      }
    );
    builder.addCase(googleAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // FACEBOOK AUTH
    builder.addCase(facebookAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      facebookAuth.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.loading = false;
      }
    );
    builder.addCase(facebookAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // PHONE AUTH
    builder.addCase(phoneAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(phoneAuth.fulfilled, (state, { payload }: LoginPayload) => {
      state.userId = payload.uid;
      state.nickname = payload.displayName;
      state.loading = false;
    });
    builder.addCase(phoneAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // EXIT USER
    builder.addCase(handleSignOut.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleSignOut.fulfilled, (state, _) => {
      state.userId = null;
      state.nickname = null;
      state.loading = false;
    });
    builder.addCase(handleSignOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
