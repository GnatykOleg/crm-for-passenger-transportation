// Import required dependencies:

// Redux
import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

// Firebase
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth, firestore } from "../../firebase/firebase-config";

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

// Constants
import { ROLES } from "../../consts/roles";

import { COLLECTIONS_NAME } from "../../consts/collections";

// Hooks
import { signInBySocialsAndEmail } from "../../hooks/signInBySocialsAndEmail";

import { getUserDoc } from "../../hooks/getUserDoc";

// Interfaces
import {
  IOnAuthStateChangePayload,
  IPhoneAuthProps,
  IRegistrationByEmailProps,
  IAuth,
} from "../../interfaces/redux-types";

// Toast library
import { toast } from "react-toastify";

// User registration by email, password and nickname
export const registrationByEmail = createAsyncThunk<
  IAuth,
  IRegistrationByEmailProps,
  { rejectValue: string }
>(
  "auth/signup-by-email",

  async ({ email, password, nickname }, { rejectWithValue }) => {
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Get current user
      const user = auth.currentUser!!;

      // Add to user displayName as nickname from params
      await updateProfile(user, {
        displayName: nickname,
      });

      // Create toast information for user for Successful sign up
      toast.success("Successful sign up");

      // Destructuring data from the user
      const { displayName, uid } = user;

      // Get doc of this user
      const userDoc = await getUserDoc({
        value: email,
        valueName: "email",
      });

      // If the document for the user exists, we update its data.
      // If suddenly the user himself is not there, but there is a document for this email
      // Цe must set up - to - date data for protection purposes.
      // As an example, if an administrator deleted a user with the Driver role
      // Nut forgot to delete the document for him, when the user re - registers we should give him No role.
      // And update his nickname if the user decides to change it.
      if (userDoc.docId) {
        await updateDoc(doc(firestore, COLLECTIONS_NAME.USERS, userDoc.docId), {
          displayName,
          uid,
          role: ROLES.PASSANGER,
        });
      }

      // If there is no document for this user when registering, we create it
      if (!userDoc.docId)
        await addDoc(collection(firestore, COLLECTIONS_NAME.USERS), {
          displayName,
          uid,
          email,
          // We set no PASSANGER as default
          role: ROLES.PASSANGER,
        });

      // Return data
      return {
        displayName,
        uid,
        email,
        // We set no PASSANGER as default
        role: ROLES.PASSANGER,
      };
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// User sign in with email and password
export const loginByEmail = createAsyncThunk<
  IAuth,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signin-by-email", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Sign in user with email and password
    const signInUser = await signInWithEmailAndPassword(auth, email, password);

    // Obtaining up-to-date information about the user to obtain the status of a new user
    const userInfo = getAdditionalUserInfo(signInUser);

    // Custom hook for sign in user, get or add data to Firestore
    const result = await signInBySocialsAndEmail(userInfo?.isNewUser);

    // Return result of signInBySocialsAndEmail call
    return result;
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

//  Google auth
export const googleAuth = createAsyncThunk<
  IAuth,
  undefined,
  { rejectValue: string }
>(
  "auth/google-auth",

  async (_, { rejectWithValue }) => {
    try {
      // Create instanse of GoogleAuthProvider
      const google = new GoogleAuthProvider();

      // Sign in user with google auth
      const signInUser = await signInWithPopup(auth, google);

      // Obtaining up-to-date information about the user to obtain the status of a new user
      const userInfo = getAdditionalUserInfo(signInUser);

      // Custom hook for sign in user, get or add data to Firestore
      const result = await signInBySocialsAndEmail(userInfo?.isNewUser);

      // Return result of signInBySocialsAndEmail call
      return result;
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Facebook auth
export const facebookAuth = createAsyncThunk<
  IAuth,
  undefined,
  { rejectValue: string }
>("auth/facebook-auth", async (_, { rejectWithValue }) => {
  try {
    // Create instanse of FacebookAuthProvider
    const facebook = new FacebookAuthProvider();

    // Sign in user with facebook auth
    const signInUser = await signInWithPopup(auth, facebook);

    // Obtaining up-to-date information about the user to obtain the status of a new user
    const userInfo = getAdditionalUserInfo(signInUser);

    // Custom hook for sign in user, get or add data to Firestore
    const result = await signInBySocialsAndEmail(userInfo?.isNewUser);

    // Return result of signInBySocialsAndEmail call
    return result;
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

// Auth by phone number
export const phoneAuth = createAsyncThunk<
  IAuth,
  IPhoneAuthProps,
  { rejectValue: string }
>(
  "auth/phone-auth",

  async ({ OTP, captchaConfirmObj }, { rejectWithValue }) => {
    try {
      // Get confirmation result from captcha confirm object
      const signInUser = await captchaConfirmObj?.confirm(OTP);

      // Obtaining up-to-date information about the user to obtain the status of a new user
      const userInfo = getAdditionalUserInfo(signInUser!!);

      // Get current user
      const user = auth.currentUser!!;

      // Create toast information for user for Successful sign in
      toast.success("Successful sign in");

      const { phoneNumber, uid } = user!!;

      // Get doc of this user
      const userDoc = await getUserDoc({
        value: phoneNumber,
        valueName: "phoneNumber",
      });

      // When logging in, if a document exists for this user and it is NOT a new user.
      // We update the data(since the example when authorizing through Google
      // Administrator can change name in document, and we update from document to user object display name
      if (userDoc.docId && !userInfo?.isNewUser)
        await updateProfile(user, {
          displayName: userDoc.userData.displayName,
        });

      // When logging in, if the document for this user exists and it is a NEW USER. We are updating the data.
      // Since the administrator could delete the user, but not his document.
      // And the user could still have a role, for example Driver, for security reasons, we always set the role of a new user to NO ROLE
      if (userDoc.docId && userInfo?.isNewUser) {
        await updateDoc(doc(firestore, COLLECTIONS_NAME.USERS, userDoc.docId), {
          displayName: `user=>${nanoid()}`,
          uid,
          phoneNumber,
          role: ROLES.PASSANGER,
        });

        // Add to user displayName as nickname using nanoid()
        await updateProfile(user, { displayName: `user=>${nanoid()}` });
      }

      // If there is no document for this user when sign in, we create it
      // Maybe the document was not added, or an error occurred.
      if (!userDoc.docId) {
        await addDoc(collection(firestore, COLLECTIONS_NAME.USERS), {
          displayName: `user=>${nanoid()}`,
          phoneNumber,
          uid,
          role: ROLES.PASSANGER,
        });
      }

      // Get corrent info for first render, if we update document
      const userDocChanged = await getUserDoc({
        value: phoneNumber,
        valueName: "phoneNumber",
      });

      // Return data
      return {
        // If userDocChanged.userData exist we set displayName from Firestore else we set displayName with nanoid()
        displayName: userDocChanged.userData
          ? userDocChanged.userData.displayName
          : `user=>${nanoid()}`,
        uid,
        // If userDocChanged.userData exist we set role from Firestore else we set NO ROLE
        role: userDocChanged.userData
          ? userDocChanged.userData.role
          : ROLES.PASSANGER,
        email: null,
        phoneNumber,
      };
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

/// On auth state change
export const authStateChangeUser = createAsyncThunk<
  IOnAuthStateChangePayload,
  IOnAuthStateChangePayload,
  { rejectValue: string }
>(
  "auth/auth-state-change",
  async (
    { uid, displayName, email, stateChange, role, phoneNumber },
    { rejectWithValue }
  ) => {
    try {
      // Return actual user data
      return { uid, displayName, email, stateChange, role, phoneNumber };
    } catch (error: any) {
      // Catch and throw error with Toast message
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// User sign out
export const handleSignOut = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("auth/signout", async (_, { rejectWithValue }) => {
  try {
    // Sign out user fir firebase method
    await signOut(auth);
  } catch (error: any) {
    // Catch and throw error with Toast message
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});
