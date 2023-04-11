// Import required dependencies:

// Firebase
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";

import { auth, firestore } from "../../firebase/firebase-config";

// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Interfaces
import { ITripsForDriver, IUserDoc } from "../../interfaces/redux-types";

// Constants
import { COLLECTIONS_NAME } from "../../consts/collections";

// Hooks
import { getUserDoc } from "../../hooks/getUserDoc";

// Toast library
import { toast } from "react-toastify";
import { ROLES } from "../../consts/roles";
import { getDocumentsByValue } from "../../hooks/getDocumentsByValue";
import { updateProfile } from "firebase/auth";
import { authStateChangeUser } from "../auth/authOpertions";

// Get all users
export const getAllUsers = createAsyncThunk<
  Array<IUserDoc>,
  undefined,
  { rejectValue: string }
>("users/all-users", async (_, { rejectWithValue, dispatch }) => {
  try {
    // Get ref of users collection
    const usersRef = collection(firestore, COLLECTIONS_NAME.USERS);

    // Get docs
    const snapshot = await getDocs(usersRef);

    // Get all users from docs
    const users = snapshot.docs.map((doc) => ({
      ...doc.data(),
      docID: doc.id,
    })) as Array<IUserDoc>;

    // Return users
    return users;
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Get drivers
export const getAllDrivers = createAsyncThunk<
  Array<IUserDoc>,
  undefined,
  { rejectValue: string }
>("trips/get-drivers", async (_, { rejectWithValue, dispatch }) => {
  try {
    // Get all drivers
    const drivers = (await getDocumentsByValue({
      value: ROLES.DRIVER,
      valueName: "role",
      collectionName: COLLECTIONS_NAME.USERS,
    })) as Array<IUserDoc>;

    // Return drivers
    return drivers;
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Get trips for a driver
export const getTripsForDriver = createAsyncThunk<
  Array<ITripsForDriver>,
  string,
  { rejectValue: string }
>(
  "trips/get-trips-for-driver",
  async (driverId: string, { rejectWithValue, dispatch }) => {
    try {
      // Get trips for driver
      const tripsForDriver = (await getDocumentsByValue({
        value: driverId,
        valueName: "driverID",
        collectionName: COLLECTIONS_NAME.TRIPS,
      })) as Array<ITripsForDriver>;

      // Return trips for driver
      return tripsForDriver;
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Get all passanger
export const getAllPassangers = createAsyncThunk<
  Array<IUserDoc>,
  undefined,
  { rejectValue: string }
>("trips/get-passangers", async (_, { rejectWithValue, dispatch }) => {
  try {
    // Get  asll passangers
    const passangers = (await getDocumentsByValue({
      value: ROLES.PASSANGER,
      valueName: "role",
      collectionName: COLLECTIONS_NAME.USERS,
    })) as Array<IUserDoc>;

    // Return passangers
    return passangers;
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Change user role
export const changeUserRole = createAsyncThunk<
  undefined,
  { value: string | null | undefined; valueName: string; role: string },
  { rejectValue: string }
>(
  "users/change-role-users",
  async ({ value, valueName, role }, { rejectWithValue, dispatch }) => {
    try {
      // Get user document
      const userDoc = await getUserDoc({ value, valueName });

      // Update user role in document
      await updateDoc(doc(firestore, COLLECTIONS_NAME.USERS, userDoc.docId), {
        role,
      });

      // Create toast information for admin for successful  change role
      toast.success("Successful  change role");

      // Get updated users
      dispatch(getAllUsers());
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Change nickname
export const changeUserNickname = createAsyncThunk<
  undefined,
  string,
  { rejectValue: string }
>("users/update-users", async (newNickName, { rejectWithValue, dispatch }) => {
  try {
    // Get current user
    const user = auth.currentUser!!;

    // Update displyaName in profile
    await updateProfile(user, {
      displayName: newNickName,
    });

    // Get user document
    const userDoc = await getUserDoc({ value: user.uid, valueName: "uid" });

    // Update user nickname in document
    await updateDoc(doc(firestore, COLLECTIONS_NAME.USERS, userDoc.docId), {
      displayName: newNickName,
    });

    // Create toast information for admin for successful  change role
    toast.success("successful change nicknamename");

    // Const Destruct values of user
    const { uid, displayName, email, phoneNumber } = user;

    // Auth state change
    await dispatch(
      authStateChangeUser({
        uid,
        displayName,
        email,
        stateChange: true,
        phoneNumber,
        role: userDoc.userData.role,
      })
    );
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});
