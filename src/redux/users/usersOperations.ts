// Import required dependencies:

// Firebase
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";

import { firestore } from "../../firebase/firebase-config";

// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Interfaces
import { IUserDoc } from "../../interfaces/redux-types";

// Constants
import { COLLECTIONS_NAME } from "../../consts/collections";

// Hooks
import { getUserDoc } from "../../hooks/getUserDoc";

// Toast library
import { toast } from "react-toastify";

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

export const changeUserRole = createAsyncThunk<
  undefined,
  { value: string; valueName: string; role: string },
  { rejectValue: string }
>(
  "users/update-users",
  async ({ value, valueName, role }, { rejectWithValue, dispatch }) => {
    try {
      // Get user document
      const userDoc = await getUserDoc({ value, valueName });

      // Update user role in document
      await updateDoc(doc(firestore, COLLECTIONS_NAME.USERS, userDoc.docId), {
        role,
      });

      // Create toast information for admin for Successful change role
      toast.success("Sucsessful change role");

      // Get updated users
      dispatch(getAllUsers());
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);
