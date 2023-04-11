// Import required dependencies:

// Firebase
import { collection, getDocs, query, where } from "@firebase/firestore";

import { firestore } from "../firebase/firebase-config";

// Constants
import { COLLECTIONS_NAME } from "../consts/collections";

// Interfaces
import { IGetUserDoc } from "../interfaces/redux-types";

// Declaring a getUserDoc hook using the props type from the IGetUserDocProps interface:
export const getUserDoc = async ({ value, valueName }: IGetUserDoc) => {
  // Get ref of users collection
  const usersRef = collection(firestore, COLLECTIONS_NAME.USERS);

  // Search query in collection by valueName and value
  // example where("email", "==", email)
  const searchQuery = query(usersRef, where(valueName, "==", value));

  // Get docs for this user by email
  const snapshot = await getDocs(searchQuery);

  // Get user data from doc
  const userData = snapshot.docs[0]?.data();

  // Return user data from doc and doc id
  return { userData, docId: snapshot.docs[0]?.id };
};
