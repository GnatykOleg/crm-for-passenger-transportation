// Import required dependencies:

// React
import React, { FC } from "react";

// Operations
import { facebookAuth } from "../../../redux/auth/authOpertions";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// React Bootstrap
import { Button } from "react-bootstrap";

// Icon
import { BsFacebook } from "react-icons/bs";

// Styles module
import s from "./AuthByFacebook.module.css";

//  Declaring a AuthByFacebook component
const AuthByFacebook: FC = () => {
  // Get dispatch from hook useAppDispatch
  const dispatch = useAppDispatch();

  // Return JSX
  return (
    <Button
      className={s.button}
      // Dispatch redux operation to redux
      onClick={() => dispatch(facebookAuth())}
      variant="outline-primary"
      type="button"
    >
      <BsFacebook />
      <span className={s.text}>Facebook</span>
    </Button>
  );
};

// Export the AuthByFacebook component:
export default AuthByFacebook;
