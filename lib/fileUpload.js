import { useState } from "react";
import { db, storage } from "@/lib/firebase";
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

export const getCertificateUrl = async (nis, certificate, setCertificateUrl) =>  {
    const storageRef = ref(
        storage,
        `certificates/${nis}.${certificate.name.split(".").pop()}`
      );

      getDownloadURL(storageRef)
      .then((url) => {
       setCertificateUrl(url)
      })
      .catch((error) => {
        throw new Error(`Failed : ${error.message}`)
      });
    
}