// Import required dependencies:

// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Operations
import {
  addTrip,
  updateTrip,
  deleteTrip,
  getAllTrips,
} from "./tripsOperations";

// Interfaces
import { IGetAllTrips, ITripsSliceState } from "../../interfaces/redux-types";

// Initial state
const initialState: ITripsSliceState = {
  trips: null,
  loading: false,
  error: null,
};

// Trips Reducer
const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add trip
    builder.addCase(addTrip.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(addTrip.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addTrip.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Delete trip
    builder.addCase(deleteTrip.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(deleteTrip.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteTrip.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Update trip
    builder.addCase(updateTrip.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(updateTrip.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateTrip.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //  Get all trips
    builder.addCase(getAllTrips.pending, (state, _) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      getAllTrips.fulfilled,
      (state, { payload }: PayloadAction<Array<IGetAllTrips>>) => {
        state.trips = payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(getAllTrips.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// Export reducer from slice
export default tripsSlice.reducer;
