import { useState } from "react";
import { signUpStudent } from "@/auth/firebase-auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [nis, setNis] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const getSignUpData = (email, nis) => {
    return {
      email: email,
      nis: nis,
    };
  };

  const resetForm = () => {
    setEmail("");
    setNis("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    const userData = getSignUpData(email, nis);
    event.preventDefault();
    signUpStudent(email,nis,password, userData).then((user) => {
      resetForm();
        router.push('/auth/registration/data-form')
        console.log(user)
        console.log(user.displayName + " signed up");
    }) .catch((error) => {
      setError(error.message);
      console.error(error.message);
    });
  };

  return (
    <div className="w-full h-[80vh] mx-auto flex items-center justify-center min-[499px]:max-w-[75%] md:max-w-md md:h-[100vh] md:shadow-[0_0_10px_0_rgba(0,0,0,0.2)] md:rounded-sm md:my-0">
      <form id="signUpForm" onSubmit={handleSubmit} className="w-[75%]">
        <div>
          <h2 className="font-[600] text-[25px]">Sign Up</h2>
          <p className="font-[400] text-sm text-black/70">
            Welcome! Please SignUp First :D
          </p>
          {error ? <p className="text-red-600 text-sm font-semibold py-2">{error}</p> : <p className="invisible">Halo banh :D</p>}
        </div>

        <div className="my-1">
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

        <div className="my-6 relative">
          {/* <label
            // for="password"
            className="block text-sm text-slate-800 font-bold"
          >
            Password
          </label> */}
          <input
            type={`${showPassword ? "text" : "password"}`}
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full py-1 border-b-2 border-slate-400 focus:outline-none focus:border-primary-color placeholder:text-sm placeholder:text-[#999999]"
            placeholder="Password"
            minLength={8}
            required
          />
          <div
            ole="button"
            tabIndex={0}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[30%] -right-1 w-6 h-6 text-center cursor-pointer"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="#94b8a3"
                className="w-4"
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#94b8a3"
                className="w-4"
              >
                <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
              </svg>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-3 mt-5 text-sm w-full font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
          <p className="text-slate-600 text-xs text-center mt-2">
            Don&sbquo;t have account? Click{" "}
            <Link href={"/auth/login"} className="text-sky-500">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
