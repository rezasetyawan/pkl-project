import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import useSWR from "swr";

export function useDocumentCollections(collectionPath) {
  const fetcher = async (collectionPath) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const companiesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return [...companiesData];
  };

  const { data, isLoading, error } = useSWR(collectionPath, fetcher);

  return {
    documentSnapshot: data,
    isLoading,
    isError: error,
  };
}

export function useCollectionsID(collectionPath) {
  const fetcher = async (collectionPath) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const documentsId = querySnapshot.docs.map((doc) => {
      return {
        params: {
          id: doc.id,
        },
      };
    });

    return documentsId;
  };

  const { data, isLoading, error } = useSWR(collectionPath, fetcher);

  return {
    documentIdSnapshot: data,
    isLoading,
    isError: error,
  };
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
    return documentsId;
  } catch (error) {
    console.log(error);
  }
}
