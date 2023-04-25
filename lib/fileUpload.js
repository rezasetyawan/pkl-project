import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadingCertificate = async (nis, certificate) => {
  const storageRef = ref(
    storage,
    `certificates/${nis}.${certificate.name.split(".").pop()}`
  );

  try {
    await uploadBytes(storageRef, certificate, {
      onProgress: (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
    });
  } catch (error) {
    throw new Error(`Failed upload : ${error.message}`);
  }
};

export const getCertificateUrl = async (nis) => {
  const storageRef = ref(storage, `certificates/${nis}.pdf`);

  console.log("processing...");
  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    throw new Error(`Failed : ${error.message}`);
  }
};
