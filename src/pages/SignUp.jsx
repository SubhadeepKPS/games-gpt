// const SignUp = () => {
//   return (
//     <div>
//       <form>
//         <input></input>
//         <input></input>
//         <input></input>
//         <button>Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

import React, { useRef, useState } from "react";
import loginPagePic from "../../assets/Flying Burger PNG Image - 960x960.png";
import { validateSignIn, validateSignUp } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const name = useRef(null);
  const email_phNo = useRef(null);
  const password = useRef(null);

  const handleSubmitButton = () => {
    console.log(name);
    console.log(email_phNo);
    console.log(password);

    // Validate the email and password
    const validationResult = name.current
      ? validateSignUp(
          name.current.value,
          email_phNo.current.value,
          password.current.value
        )
      : validateSignIn(email_phNo.current.value, password.current.value);

    console.log(validationResult);
    setErrorMessage(validationResult);
    if (validationResult) return;
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email_phNo.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User signed up: ", user);
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          setIsSignIn(true);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " - ", errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email_phNo.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in: ", user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " - ", errorMessage);
        });
    }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    //   });
    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }
  };

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="h-screen w-screen">
      <h2 className="text-slate-50 text-3xl font-bold">
        {isSignIn ? "Log In" : "Sign Up"}
      </h2>
      <div className="flex">
        <div className="flex justify-between items-center w-6/12 h-4/6 mx-32 my-32  bg-gradient-to-tl from-gray-900 to-slate-800 border-2 border-slate-600 rounded-2xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex-col mx-20 w-full h-4/6"
          >
            {!isSignIn && (
              <div className="">
                <input
                  ref={name}
                  type="text"
                  placeholder="Full Name"
                  className="px-6 w-full h-12 border-2 border-slate-600 rounded-md bg-slate-800 text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:bg-slate-800"
                ></input>
              </div>
            )}

            <div className="">
              <input
                ref={email_phNo}
                type="text"
                placeholder="Email / Phone no."
                className="px-6 w-full h-12 border-2 border-slate-600 rounded-md bg-slate-800 text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:bg-slate-800"
              ></input>
            </div>
            <div className="">
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="px-6 w-full h-12 border-2 border-slate-600 rounded-md bg-slate-800 focus:bg-slate-800"
              ></input>
            </div>
            <div>
              <p className="text-red-600">{errorMessage}</p>
            </div>
            <button
              onClick={() => handleSubmitButton()}
              className="w-full h-12 bg-slate-50 rounded-md"
            >
              {isSignIn ? "Log In" : "Sign Up"}
            </button>
            <p
              onClick={() => handleToggleSignIn()}
              className="text-slate-300 cursor-pointer"
            >
              {isSignIn
                ? "New to EcoFood? Sign Up Now.."
                : "Already a User? Log In Here.."}
            </p>
          </form>
        </div>
        <div className="w-8/12 flex justify-center items-center">
          <img className="w-8/12" src={loginPagePic} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
