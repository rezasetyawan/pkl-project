import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";

export default function TestPage() {
  const [inputFieldCounter, setInputFieldCounter] = useState(1);
  const [token, setToken] = useState("");
  const [pklMarks, setPklMarks] = useState([{}]);

  const renderElements = () => {
    const elements = [];
    for (let i = 0; i < inputFieldCounter; i++) {
      elements.push(
        <div className="flex">
          <input
            type="number"
            className="border-2 my-5"
            onChange={(event) =>
              handleNisInputValueChange(event.target.value, i)
            }
          ></input>
          <input
            key={i}
            type="text"
            className="border-2 my-5"
            onChange={(event) =>
              handleMarkInputValueChange(event.target.value, i)
            }
          ></input>
        </div>
      );
    }
    return elements;
  };

  const handleMarkInputValueChange = (value, index) => {
    setPklMarks((prevMarks) => {
      const updatedMarks = [...prevMarks];
      updatedMarks[index] = { ...updatedMarks[index], pklMark: value };
      return updatedMarks;
    });
  };
  const handleNisInputValueChange = (value, index) => {
    setPklMarks((prevMarks) => {
      const updatedMarks = [...prevMarks];
      updatedMarks[index] = { ...updatedMarks[index], nis: value };
      return updatedMarks;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDoc(doc(db, "intern_evaluator", token))
      .then((document) => {
        pklMarks.forEach((mark) => {
          if (!document.data().access.includes(mark.nis)) {
            return alert("ngapain luwh");
          }
        });
      })
      .catch((error) => {
        alert("tokennya salah bang");
      });
    pklMarks.forEach((mark) => {
      const querySnapshot = query(
        collection(db, "students-test"),
        where("nis", "==", mark.nis)
      );

      getDocs(querySnapshot)
        .then((docSnapshot) => {
          docSnapshot.forEach((document) => {
            setDoc(
              doc(db, "students-test", document.id),
              { pklMark: mark.pklMark },
              { merge: true }
            );
          });
        })
        .catch((error) => {
          console.error("Error getting documents:", error);
        });
    });
  };

  const elements = renderElements();

  return (
    <>
      <article className="flex justify-center flex-col items-center">
        <form onSubmit={handleSubmit}>
          <label>Token</label>
          <input
            value={token}
            type="text"
            className="border-2 my-5"
            onChange={(event) => setToken(event.target.value.toUpperCase())}
          ></input>
          <div className="flex gap-10">
            <p>NIS</p>
            <p>NILAI</p>
          </div>
          {elements.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
          <div className="flex gap-3">
            <button
              type="button"
              className="border p-2"
              onClick={() => {
                setInputFieldCounter(inputFieldCounter - 1);
                pklMarks.pop();
              }}
            >
              min
            </button>
            <button
              type="button"
              className="border p-2"
              onClick={() => {
                setInputFieldCounter(inputFieldCounter + 1);
                setPklMarks((prevMarks) => [...prevMarks, {}]);
              }}
            >
              add
            </button>
            <button type="submit" className="border p-2">
              submit
            </button>
          </div>
        </form>
      </article>
    </>
  );
}
