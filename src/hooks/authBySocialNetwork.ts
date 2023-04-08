import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import { IUserNameAndID } from "../interfaces/redux-types";
import { ROLES } from "../consts/roles";
import { COLLECTIONS_NAME } from "../consts/collections";

export const authBySocialNetwork = async (): Promise<IUserNameAndID> => {
  // Get user
  const user = auth.currentUser;

  // Create toast information for user
  toast.success("Successful sign in");

  // Destructuring data from the user
  const { displayName, uid, email } = user!!;

  // Get ref of collection
  const usersRef = collection(firestore, COLLECTIONS_NAME.USERS);

  // Search query in collection
  const searchQuery = query(usersRef, where("email", "==", email));

  // Check if document in collection whith searchValue exist
  const snapshot = await getDocs(searchQuery);

  // If document with this email, doesnt exist, we create document
  if (snapshot.empty)
    await addDoc(collection(firestore, COLLECTIONS_NAME.USERS), {
      displayName,
      uid,
      email,
      role: ROLES.PASSANGER,
    });

  // Always return data
  return { displayName, uid };
};
