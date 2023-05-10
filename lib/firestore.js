import { db } from "@/lib/firebase";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import useSWR from "swr";

export function useDocumentCollections(collectionPath) {
  const fetcher = async (collectionPath) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const documentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return [...documentsData];
  };

  const { data, isLoading, error } = useSWR(collectionPath, fetcher);

  return {
    documentSnapshot: data,
    isLoading,
    isError: error,
  };
}

export function useDocumentByID(collectionPath, documentId) {
  console.log(collectionPath,documentId)
  const fetcher = async (collectionPath, documentId) => {
    const docSnapshot = await getDoc(doc(db, collectionPath, documentId));
    const documentData = docSnapshot.data()
    console.log(documentData)
    return { ...documentData };
  };

  const { data, isLoading, error } = useSWR(
    [collectionPath, documentId],
    ([collectionPath, documentId]) => fetcher(collectionPath, documentId)
  );

  return {
    documentData: data,
    isLoading,
    isError: error,
  };
}

export async function getDocumentDataById (collectionPath,documentId) {
  const docSnapshot = await getDoc(doc(db, collectionPath, documentId))
}

export async function getDocumentsId(collectionPath) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const documentsId = querySnapshot.docs.map((doc) => {
      return {
        params: {
          id: doc.id,
        },
      };
    });
    console.log(documentsId);
    return documentsId;
  } catch (error) {
    console.log(error);
  }
}
