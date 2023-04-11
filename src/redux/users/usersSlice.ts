// Import required dependencies:

// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Operations
import {
  changeUserNickname,
  changeUserRole,
  getAllDrivers,
  getAllPassangers,
  getAllUsers,
  getTripsForDriver,
  getTripsForPassanger,
} from "./usersOperations";

// Interfaces
import {
  ITripsForRole,
  IUserDoc,
  IUsersSliceState,
} from "../../interfaces/redux-types";

// Initial state
const initialState: IUsersSliceState = {
  users: null,
  drivers: null,
  passangers: null,
  tripsForPassanger: null,
  tripsForDriver: null,
  loading: false,
  error: null,
};

// Users Reducer
const usersSlice = createSlice({
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
        state.users = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //  Get Drivers
    builder.addCase(getAllDrivers.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      getAllDrivers.fulfilled,
      (state, { payload }: PayloadAction<Array<IUserDoc>>) => {
        state.drivers = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getAllDrivers.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Get all passangers
    builder.addCase(getAllPassangers.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      getAllPassangers.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.passangers = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getAllPassangers.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Get trips for driver
    builder.addCase(getTripsForDriver.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      getTripsForDriver.fulfilled,
      (state, { payload }: PayloadAction<Array<ITripsForRole>>) => {
        state.tripsForDriver = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getTripsForDriver.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Get trips for passanger
    builder.addCase(getTripsForPassanger.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      getTripsForPassanger.fulfilled,
      (state, { payload }: PayloadAction<Array<ITripsForRole>>) => {
        state.tripsForPassanger = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getTripsForPassanger.rejected, (state, action) => {
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

    // Change user nickname
    builder.addCase(changeUserNickname.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(changeUserNickname.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(changeUserNickname.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// Export reducer from slice
export default usersSlice.reducer;
