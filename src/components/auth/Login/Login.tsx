// Import required dependencies:

// React
import React, { FC } from "react";

// Operations
import { loginByEmail } from "../../../redux/auth/authOpertions";

// Components
import AuthByEmail from "../AuthByEmail/AuthByEmail";

// Declaring a Login component
const Login: FC = () => (
  <AuthByEmail authMehod={loginByEmail} submitButtonText="Login" />
);

// Export the ConfirmOTPForm component:
export default Login;
