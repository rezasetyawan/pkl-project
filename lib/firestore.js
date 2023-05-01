import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import useSWR from "swr";

export function useCollectionDocuments(collectionPath) {
  const fetcher = async (collectionPath) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const companyData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return [...companyData];
  };

  const { data, isLoading, error } = useSWR(collectionPath, fetcher);

  console.log(data)
  return {
    documentSnapshot: data,
    isLoading,
    isError: error,
  };
}
