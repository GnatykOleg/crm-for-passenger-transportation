// Import required dependencies:

// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Operations
import { changeUserRole, getAllUsers } from "./usersOperations";

// Interfaces
import { IUserDoc, IUsersSliceState } from "../../interfaces/redux-types";

// Initial state
const initialState: IUsersSliceState = {
  users: null,
  loading: false,
  error: null,
};

// Auth Reducer
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all users
    builder.addCase(getAllUsers.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      getAllUsers.fulfilled,
      (state, { payload }: PayloadAction<Array<IUserDoc>>) => {
        console.log("payload", payload);
        state.users = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Change user role
    builder.addCase(changeUserRole.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(changeUserRole.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(changeUserRole.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// Export reducer from slice
export default userSlice.reducer;
