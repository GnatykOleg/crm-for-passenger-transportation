// Import required dependencies:

// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Redux operations
import {
  facebookAuth,
  googleAuth,
  phoneAuth,
  loginByEmail,
  registrationByEmail,
  handleSignOut,
  authStateChangeUser,
} from "./authOpertions";

// Interfaces
import {
  IAuthSliceState,
  IOnAuthStateChangePayload,
  LoginPayload,
} from "../../interfaces/redux-types";

// Initial state
const initialState: IAuthSliceState = {
  userId: null,
  nickname: null,
  stateChange: null,
  role: null,
  email: null,
  phoneNumber: null,
  loading: false,
  error: null,
};

// Auth Reducer
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // User registration by email, password and nickname
    builder.addCase(registrationByEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registrationByEmail.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.email = payload.email;
        state.loading = false;
        state.role = payload.role;
      }
    );
    builder.addCase(registrationByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // User sign in by email and password
    builder.addCase(loginByEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginByEmail.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.email = payload.email;
        state.loading = false;
        state.role = payload.role;
      }
    );
    builder.addCase(loginByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Google auth
    builder.addCase(googleAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      googleAuth.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.email = payload.email;
        state.role = payload.role;
        state.loading = false;
      }
    );
    builder.addCase(googleAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Facebook auth
    builder.addCase(facebookAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      facebookAuth.fulfilled,
      (state, { payload }: LoginPayload) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.email = payload.email;
        state.role = payload.role;
        state.loading = false;
      }
    );
    builder.addCase(facebookAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Auth by phone number
    builder.addCase(phoneAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(phoneAuth.fulfilled, (state, { payload }: LoginPayload) => {
      state.userId = payload.uid;
      state.nickname = payload.displayName;
      state.phoneNumber = payload.phoneNumber;
      state.email = payload.email;
      state.role = payload.role;
      state.loading = false;
    });
    builder.addCase(phoneAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // On auth state change
    builder.addCase(authStateChangeUser.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      authStateChangeUser.fulfilled,
      (
        state,
        {
          payload: { uid, displayName, email, stateChange, role, phoneNumber },
        }: PayloadAction<IOnAuthStateChangePayload>
      ) => {
        state.loading = false;
        state.error = null;
        state.nickname = displayName;
        state.userId = uid;
        state.phoneNumber = phoneNumber;
        state.stateChange = stateChange;
        state.email = email;
        state.role = role;
      }
    );
    builder.addCase(authStateChangeUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // User sign out
    builder.addCase(handleSignOut.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleSignOut.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.nickname = null;
      state.userId = null;
      state.stateChange = null;
      state.email = null;
      state.role = null;
      state.phoneNumber = null;
    });
    builder.addCase(handleSignOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export reducer from slice
export default authSlice.reducer;
