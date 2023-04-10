// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Firebase
import { firestore } from "../../firebase/firebase-config";

import { collection, getDocs } from "@firebase/firestore";

import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Constants
import { COLLECTIONS_NAME } from "../../consts/collections";

// Interfaces
import {
  IGetAllTrips,
  ITrip,
  IUpdateTripProps,
} from "../../interfaces/redux-types";

// Toast library
import { toast } from "react-toastify";

// Add trip
export const addTrip = createAsyncThunk<
  undefined,
  ITrip,
  { rejectValue: string }
>("trips/add-trip", async (tripInfo: ITrip, { rejectWithValue, dispatch }) => {
  try {
    // Create document with trip information in firestore
    await addDoc(collection(firestore, COLLECTIONS_NAME.TRIPS), tripInfo);

    // Get toast for disptacher
    toast.success("Successful add trip");
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Delete trip
export const deleteTrip = createAsyncThunk<
  undefined,
  string,
  { rejectValue: string }
>("trips/get-delete-trip", async (tripDocID, { rejectWithValue, dispatch }) => {
  try {
    // Delete document from firestore
    await deleteDoc(doc(firestore, COLLECTIONS_NAME.TRIPS, tripDocID));

    // Refetch all trips
    await dispatch(getAllTrips());
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Update trip
export const updateTrip = createAsyncThunk<
  undefined,
  IUpdateTripProps,
  { rejectValue: string }
>(
  "trips/update-trip",
  async (
    { docID, updatedTripInfo }: IUpdateTripProps,
    { rejectWithValue, dispatch }
  ) => {
    try {
      // Update trip document
      await updateDoc(doc(firestore, COLLECTIONS_NAME.TRIPS, docID), {
        ...updatedTripInfo,
      });

      // Refetch all trips
      await dispatch(getAllTrips());
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Get all trips
export const getAllTrips = createAsyncThunk<
  Array<IGetAllTrips>,
  undefined,
  { rejectValue: string }
>("trips/get-all-trips", async (_, { rejectWithValue, dispatch }) => {
  try {
    // Get ref of users collection
    const tripsDocRef = collection(firestore, COLLECTIONS_NAME.TRIPS);

    // Get docs
    const snapshot = await getDocs(tripsDocRef);

    // Get all trips from docs, with add docID
    const trips = snapshot.docs.map((doc) => ({
      ...doc.data(),
      docID: doc.id,
    })) as Array<IGetAllTrips>;

    // Return trips
    return trips;
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});
