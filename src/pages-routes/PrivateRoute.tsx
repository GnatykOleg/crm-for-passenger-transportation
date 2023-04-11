// Import required dependencies:

// React
import React, { FC } from "react";

// React Router
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

// Constants
import { ROUTES } from "../consts/routes";

// Interfaces
import { IPrivateRouteProps } from "../interfaces/router-types";

// Redux Hooks
import { useAppSelector } from "../hooks/redux-hooks";

// Toast library
import { toast } from "react-toastify";
import { authDataSelector } from "../redux/auth/authSelectors";

// Declaring a PrivateRoute component using the props type from the IPrivateRouteProps interface:
const PrivateRoute: FC<IPrivateRouteProps> = ({
  roles,
}: IPrivateRouteProps) => {
  // Getting the location object from the useLocation hook:
  const location = useLocation();

  // Getting the navigate object from the useNavigate hook:
  const navigate = useNavigate();

  // Create a from object for use in Navigate:
  const from = { from: location };

  // Getting the user object from the useAppSelector hook:
  const user = useAppSelector(authDataSelector);

  // Check if the user's role matches one of the roles specified in the props. If yes, return Outlet:
  if (user.role && roles.includes(user.role)) return <Outlet />;

  // Check if the userId is not null. If there is a userId, we return to the previous page and display an error in the form of a Toast notification:
  if (user.userId) {
    navigate(-1);
    toast.error(`You do not have access to page: ${location.pathname}`);
    return null;
  }

  // If the userId is missing, redirect the user to the home page:
  return <Navigate to={ROUTES.HOME} state={from} replace />;
};

// Export the PrivateRoute component:
export default PrivateRoute;
