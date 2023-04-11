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

//  Declaring a AuthByGoogle component
const AuthByGoogle: FC = () => {
  // Get dispatch from hook useAppDispatch
  const dispatch = useAppDispatch();

  // Return JSX
  return (
    <Button
      className="w-50 mx-auto"
      // Dispatch redux operation to redux
      onClick={() => dispatch(googleAuth())}
      variant="outline-primary"
      type="button"
    >
      <BsGoogle />
      <span className="ms-2 fw-bold">Google</span>
    </Button>
  );
};

// Export the AuthByGoogle component:
export default AuthByGoogle;
