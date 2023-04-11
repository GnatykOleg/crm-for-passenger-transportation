// Import required dependencies:

// React
import React, { FC, useEffect, useState } from "react";

// React Router
import { Navigate, Outlet, useLocation } from "react-router";

// Constants
import { ROUTES } from "../consts/routes";
import { ROLES } from "../consts/roles";

// Redux Hooks
import { useAppSelector } from "../hooks/redux-hooks";
import { authDataSelector } from "../redux/auth/authSelectors";

// Declaring a PublicRoute component:
const PublicRoute: FC = () => {
  // State of redirection to the desired page, which corresponds to the role
  const [to, setTo] = useState<string | null>(null);

  // Getting the location object from the useLocation hook:
  const location = useLocation();

  // Create a from object for use in Navigate:
  const from = { from: location };

  // Getting the user object from the useAppSelector hook:
  const user = useAppSelector(authDataSelector);

  // Using the useEffect hook to handle state changes user.role
  useEffect(() => {
    // Check if the user's role is not null
    if (user.role !== null) {
      // Enumeration of roles and paths using switch case
      switch (user.role) {
        case ROLES.ADMIN:
          setTo(ROUTES.ADMIN);
          break;
        case ROLES.DISPATCHER:
          setTo(ROUTES.DISPATCHER);
          break;
        case ROLES.DRIVER:
          setTo(ROUTES.DRIVER);
          break;
        case ROLES.PASSANGER:
          setTo(ROUTES.TRIPS);
          break;
      }
    }
  }, [user.role]);

  // If the user has a role and there is a route for this role, then the component redirects him to the appropriate route
  // Otherwise, the component displays the contents of the current route using the Outlet component, i.e. the Home page containing the authentication logic
  return user.role && to ? (
    <Navigate to={to} state={from} replace />
  ) : (
    <Outlet />
  );
};

// Export the PrivateRoute component:
export default PublicRoute;
