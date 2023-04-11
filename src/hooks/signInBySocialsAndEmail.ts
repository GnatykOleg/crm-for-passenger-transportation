// Import required dependencies:

// Firebase
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import { auth, firestore } from "../firebase/firebase-config";

// Constants
import { ROLES } from "../consts/roles";

import { COLLECTIONS_NAME } from "../consts/collections";

// Interfaces
import { IAuth } from "../interfaces/redux-types";

// Custom hook for get user document
import { getUserDoc } from "./getUserDoc";

// Toast libraty
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

// Declaring a signInBySocialsAndEmail component using the props isNewUser :
export const signInBySocialsAndEmail = async (
  isNewUser: boolean | undefined
): Promise<IAuth> => {
  // Get current user
  const user = auth.currentUser!!;

  // Create toast information for user for successful  sign in
  toast.success("Successful  sign in");

  // Destructuring data from the user
  const { displayName, uid, email } = user;

  // Get user doc from custom hook getUserDoc for more info go to hook getUserDoc
  const userDoc = await getUserDoc({ value: email, valueName: "email" });

  // When logging in, if a document exists for this user and it is NOT a new user.
  // We update the data(since the example when authorizing through Google
  // Administrator can change name in document, and we update from document to user object display name
  if (userDoc.docId && !isNewUser)
    await updateProfile(user, { displayName: userDoc.userData.displayName });

  // When logging in, if the document for this user exists and it is a NEW USER. We are updating the data.
  // Since the administrator could delete the user, but not his document.
  // And the user could still have a role, for example Driver, for security reasons, we always set the role of a new user to NO ROLE
  if (userDoc.docId && isNewUser) {
    await updateDoc(doc(firestore, COLLECTIONS_NAME.USERS, userDoc.docId), {
      displayName,
      uid,
      email,
      role: ROLES.PASSANGER,
    });
  }

  // If there is no document for this user when sign in, we create it
  // Maybe the document was not added, or an error occurred.
  if (!userDoc.docId)
    await addDoc(collection(firestore, COLLECTIONS_NAME.USERS), {
      displayName,
      uid,
      email,
      role: ROLES.PASSANGER,
    });

  // Get corrent info for first render, if we update document
  const userDocChanged = await getUserDoc({ value: email, valueName: "email" });

  // Return data
  return {
    displayName: userDocChanged.userData.displayName,
    uid,
    email,
    // If userDocChanged.userData exist we set role from Firestore else we set NO ROLE
    role: userDocChanged.userData
      ? userDocChanged.userData.role
      : ROLES.PASSANGER,
  };
};
