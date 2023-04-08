import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  ConfirmationResult,
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { authBySocialNetwork } from "../../hooks/authBySocialNetwork";
import { IUserNameAndID } from "../../interfaces/redux-types";
import { ROLES } from "../../consts/roles";
import { COLLECTIONS_NAME } from "../../consts/collections";

// USER REGISTRATION WITH EMAIL
export const registrationByEmail = createAsyncThunk<
  IUserNameAndID,
  { email: string; password: string; nickname?: string },
  { rejectValue: string }
>(
  "auth/signup-by-email",

  async ({ email, password, nickname }, { rejectWithValue }) => {
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Get user
      const user = auth.currentUser!!;

      // Add to user displayName as nickname from params
      await updateProfile(user, {
        displayName: nickname,
      });

      // Create toast information for user
      toast.success("Successful sign up");

      // Destructuring data from the user
      const { displayName, uid } = user;

      // Add user info to firestore
      await addDoc(collection(firestore, COLLECTIONS_NAME.USERS), {
        displayName,
        uid,
        email,
        role: ROLES.PASSANGER,
      });

      // Return data
      return { displayName, uid };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// USER LOGIN WITH EMAIL AND PASSWORD
export const loginByEmail = createAsyncThunk<
  IUserNameAndID,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signin-by-email", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Sign in user with email and password
    await signInWithEmailAndPassword(auth, email, password);

    // Get user
    const user = auth.currentUser!!;

    // Create toast information for user
    toast.success("Successful sign in");

    // Destructuring data from the user
    const { displayName, uid } = user;

    // Return data
    return { displayName, uid };
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

//  GOOGLE AUTH
export const googleAuth = createAsyncThunk<
  IUserNameAndID,
  undefined,
  { rejectValue: string }
>(
  "auth/google-auth",

  async (_, { rejectWithValue }) => {
    try {
      // Create instanse of auth method
      const google = new GoogleAuthProvider();

      // Enter with google
      await signInWithPopup(auth, google);

      // Get user data, and create user in firestore
      const result = await authBySocialNetwork();

      // Return user data
      return result;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// FACEBOOK AUTH
export const facebookAuth = createAsyncThunk<
  IUserNameAndID,
  undefined,
  { rejectValue: string }
>("auth/facebook-auth", async (_, { rejectWithValue }) => {
  try {
    // Create instanse of auth method
    const facebook = new FacebookAuthProvider();

    // Enter with facebook
    await signInWithPopup(auth, facebook);

    // Get user data, and create user in firestore
    const result = await authBySocialNetwork();

    // Return user data
    return result;
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// PHONE AUTH
export const phoneAuth = createAsyncThunk<
  IUserNameAndID,
  { OTP: string; captchaConfirmObj: ConfirmationResult | undefined },
  { rejectValue: string }
>(
  "auth/phone-auth",

  async ({ OTP, captchaConfirmObj }, { rejectWithValue }) => {
    try {
      // Check is captcha has confirm object
      if (captchaConfirmObj) await captchaConfirmObj.confirm(OTP);

      // Get user
      const user = auth.currentUser!!;

      // Add to user displayName as rundom value
      await updateProfile(user, {
        displayName: `USER=${nanoid()}`,
      });

      // Create toast information for user
      toast.success("Successful sign in");

      // Destructuring data from the user
      const { phoneNumber, uid } = user;

      // Get ref of collection
      const usersRef = collection(firestore, COLLECTIONS_NAME.USERS);

      // Search query in collection
      const searchQuery = query(
        usersRef,
        where("phoneNumber", "==", phoneNumber)
      );

      // Check if document in collection whith searchValue exist
      const snapshot = await getDocs(searchQuery);

      // If document with this email, doesnt exist, we create document
      if (snapshot.empty)
        await addDoc(collection(firestore, COLLECTIONS_NAME.USERS), {
          displayName: `USER=${nanoid()}`,
          phoneNumber,
          uid,
          role: ROLES.PASSANGER,
        });

      // Always return data
      return { displayName: `USER=${nanoid()}`, uid };
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// EXIT USER
export const handleSignOut = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("auth/signout", async (_, { rejectWithValue }) => {
  try {
    // Sign out user
    await signOut(auth);
  } catch (error: any) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// +1 650-555-1234
