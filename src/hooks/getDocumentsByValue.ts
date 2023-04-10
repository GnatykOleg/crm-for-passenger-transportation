import { firestore } from "../firebase/firebase-config";

import { collection, getDocs, query, where } from "@firebase/firestore";

export const getDocumentsByValue = async ({
  value,
  valueName,
  collectionName,
}: any) => {
  const docsRef = collection(firestore, collectionName);

  // Search query in collection by valueName and value
  // example where("email", "==", email)
  const searchQuery = query(docsRef, where(valueName, "==", value));

  // Get docs for this user by email
  const snapshot = await getDocs(searchQuery);

  // Get user data from doc with add docID
  const docsForSerachValue = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));

  return docsForSerachValue;
};
