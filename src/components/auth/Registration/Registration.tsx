// Import required dependencies:

// React
import React, { FC } from "react";

// Operations
import { registrationByEmail } from "../../../redux/auth/authOpertions";

// Components
import AuthByEmail from "../AuthByEmail/AuthByEmail";

// Declaring a Registration component
const Registration: FC = () => (
  <AuthByEmail
    isRegistration
    authMehod={registrationByEmail}
    submitButtonText="Sign up"
  />
);

// Export the Registration component:
export default Registration;
