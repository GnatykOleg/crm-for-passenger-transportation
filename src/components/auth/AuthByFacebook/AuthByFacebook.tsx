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

//  Declaring a AuthByFacebook component
const AuthByFacebook: FC = () => {
  // Get dispatch from hook useAppDispatch
  const dispatch = useAppDispatch();

  // Return JSX
  return (
    <Button
      className="w-50 mx-auto"
      // Dispatch redux operation to redux
      onClick={() => dispatch(facebookAuth())}
      variant="outline-primary"
      type="button"
    >
      <BsFacebook />
      <span className="ms-2 fw-bold">Facebook</span>
    </Button>
  );
};

// Export the AuthByFacebook component:
export default AuthByFacebook;
