// Import required dependencies:

// React
import React, { FC, useState } from "react";

// Components
import ConfirmOTPForm from "./ConfirmOTPForm";
import GetOTPForm from "./GetOTPForm";

// Firebase
import { auth } from "../../../firebase/firebase-config";

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Toast Library
import { toast } from "react-toastify";

//  Declaring a AuthByPhone component
const AuthByPhone: FC = () => {
  // Local state

  // Show component get OTP
  const [showGetOTP, setShowGetOTP] = useState<boolean>(true);

  // Show component confirm OTP
  const [showConfirmOTP, setShowConfirmOTP] = useState<boolean>(false);

  // Save object from captcha res
  const [captchaConfirmObj, setCaptchaConfirmObj] =
    useState<ConfirmationResult>();

  // Set up recaptcha
  const setUpRecaptcha = async (phoneNumber: string) => {
    try {
      // Create instance of repactcha
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );

      // Render recaptcha
      recaptchaVerifier.render();

      // Get recaptcha response
      const captchaRes = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

      // Set recaptcha res config
      setCaptchaConfirmObj(captchaRes);

      // Hide get OTP component
      setShowGetOTP(false);

      // Show confirm code from OTP
      setShowConfirmOTP(true);

      // Return captcha response
      return captchaRes;
    } catch (error) {
      // Throw error
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <>
      {/* Get OTP component */}
      {showGetOTP && <GetOTPForm setUpRecaptcha={setUpRecaptcha} />}

      {/* Confirm OTP component */}
      {showConfirmOTP && (
        <ConfirmOTPForm captchaConfirmObj={captchaConfirmObj} />
      )}
    </>
  );
};

// Export the AuthByPhone component:
export default AuthByPhone;
