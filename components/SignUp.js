import { useState } from "react";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [nis, setNis] = useState();
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  const getSignUpData = (email, nis, password) => {
    return {
      email: email,
      nis: nis,
      password: password,
    };
  };

  const resetForm = () => {
    setEmail("");
    setNis();
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = getSignUpData(email, nis, password);

    await setDoc(doc(db, "users", nis), userData).then(() => {
      resetForm();
    });

    // createUserWithEmailAndPassword(auth, email, password).then(
    //   async (userCredential) => {
    //   const user

    //     await setDoc(doc(db, "users", nis), userData);
    //   }
    // );
  };

  return (
    <div className="w-full h-[80vh] mx-auto flex items-center justify-center min-[499px]:max-w-[75%] md:w-[50%] md:h-[100vh] md:shadow-lg md:rounded-sm md:my-0 lg:w-[33%]">
      <form id="signUpForm" onSubmit={handleSubmit} className="w-[75%]">
        <div>
          <h2 className="font-[600] text-[25px]">Sign Up</h2>
          <p className="font-[400] text-sm text-black/70">
            Welcome! Please SignUp First :D
          </p>
        </div>

        <div className="my-6">
          {/* <label
            // for="email"
            lassName="block text-sm text-slate-800 font-bold"
          >
            Email
          </label> */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
            placeholder="Email"
            required
          />
        </div>

        <div className="my-6">
          {/* <label
            // for="nis"
            className="block text-sm text-slate-800 font-bold"
          >
            NIS
          </label> */}
          <input
            type="number"
            id="nis"
            value={nis}
            onChange={(event) => setNis(event.target.value)}
            className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
            placeholder="NIS"
            required
          />
        </div>

        <div className="my-6">
          {/* <label
            // for="password"
            className="block text-sm text-slate-800 font-bold"
          >
            Password
          </label> */}
          <input
            type="password"
            // type={`${showPassword?  "text" : "password"}`}
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
            placeholder="Password"
            minLength={8}
            required
          />
          {/* <button onClick={() => setShowPassword(!showPassword)} className="w-full h-full">
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-primary-color"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.3533 1.35352C23.7438 1.74404 23.7438 2.37721 23.3533 2.76773L2.76748 23.3535C2.37696 23.744 1.7438 23.744 1.35327 23.3535L0.646164 22.6464C0.25564 22.2559 0.255641 21.6227 0.646165 21.2322L3.87169 18.0067C2.73572 16.8882 1.8787 15.6816 1.27296 14.6799C0.867402 14.0092 0.568856 13.421 0.370367 12.9971C0.27101 12.785 0.196402 12.6133 0.145717 12.4922C0.120366 12.4317 0.100973 12.3838 0.0874364 12.3497L0.0715024 12.3091L0.0667999 12.2969L0.0652601 12.2928L0.0646926 12.2913C0.0646926 12.2913 0.0642597 12.2902 0.999765 11.9371L0.0739539 11.5593L0.0743572 11.5583L0.0754044 11.5557L0.0784618 11.5483L0.0884377 11.5245C0.0968071 11.5046 0.108623 11.4769 0.123909 11.4419C0.154474 11.372 0.198955 11.2727 0.257542 11.1484C0.374643 10.8998 0.548544 10.55 0.780854 10.1325C1.24425 9.29981 1.94654 8.18638 2.90279 7.0685C4.80627 4.84327 7.80917 2.5 11.9998 2.5C14.2445 2.5 16.1542 3.17475 17.7342 4.14417L21.2319 0.646409C21.6225 0.255885 22.2556 0.255885 22.6462 0.646409L23.3533 1.35352ZM8.70226 13.1761L13.1759 8.70251C12.8083 8.57139 12.4124 8.5 11.9998 8.5C10.0668 8.5 8.49976 10.067 8.49976 12C8.49976 12.4126 8.57115 12.8085 8.70226 13.1761Z"
                fill="#000000"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-primary-color"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9998 2.5C7.80915 2.5 4.80625 4.84327 2.90277 7.0685C1.75082 8.41516 0.784974 9.9348 0.0778624 11.5618C-0.0226214 11.793 -0.026017 12.0548 0.0686626 12.2885C0.738203 13.9407 1.67953 15.4881 2.81769 16.8577C4.70132 19.1243 7.70679 21.5 11.9998 21.5C16.2929 21.5 19.2983 19.1243 21.182 16.8577C22.3201 15.4881 23.2614 13.9407 23.931 12.2885C24.0257 12.0548 24.0222 11.793 23.9219 11.5617C23.2116 9.92407 22.2616 8.43011 21.0969 7.0685C19.1934 4.84327 16.1905 2.5 11.9998 2.5ZM15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
                fill="#000000"
              />
            </svg>
          )}
        </button> */}
        </div>

        <button
          type="submit"
          className="px-4 py-3 mt-5 text-sm w-full font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
