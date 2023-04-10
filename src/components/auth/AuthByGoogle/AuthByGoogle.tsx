// Import required dependencies:

// React
import React, { FC } from "react";

// Operations
import { googleAuth } from "../../../redux/auth/authOpertions";

// Hooks
import { useAppDispatch } from "../../../hooks/redux-hooks";

// React Bootstrap
import { Button } from "react-bootstrap";

// Icon
import { BsGoogle } from "react-icons/bs";

// Styles module
import s from "./AuthByGoogle.module.css";

//  Declaring a AuthByGoogle component
const AuthByGoogle: FC = () => {
  // Get dispatch from hook useAppDispatch
  const dispatch = useAppDispatch();

  // Return JSX
  return (
    <Button
      className={s.button}
      // Dispatch redux operation to redux
      onClick={() => dispatch(googleAuth())}
      variant="outline-primary"
      type="button"
    >
      <BsGoogle />
      <span className={s.text}>Google</span>
    </Button>
  );
};

// Export the AuthByGoogle component:
export default AuthByGoogle;
