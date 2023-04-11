// Import required dependencies:

// React
import React, { FC, Suspense, lazy, useEffect } from "react";

// React Router
import { Routes, Route } from "react-router";

// Firebase

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase-config";

// Constants
import { ROLES } from "../consts/roles";

import { ROUTES } from "../consts/routes";

// Private and Public Route
import PrivateRoute from "./PrivateRoute";

import PublicRoute from "./PublicRoute";

// Array with roles to routes
import {
  adminRouteRoles,
  dispatcherRouteRoles,
  driverRouteRoles,
  passangerRouteRoles,
  tripsRouteRoles,
} from "./rolesArraysForPrivateRouting";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

import { authStateChangeUser } from "../redux/auth/authOpertions";

// Hooks

import { getUserDoc } from "../hooks/getUserDoc";

// Components
import { Loader } from "../components";

import { authDataSelector } from "../redux/auth/authSelectors";

// Lazy loading pages
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));

const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));

const TripsPage = lazy(() => import("../pages/TripsPage/TripsPage"));

const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const DriverPage = lazy(() => import("../pages/DriverPage/DriverPage"));

const PassangerPage = lazy(
  () => import("../pages/PassangerPage/PassangerPage")
);

const DispatcherPage = lazy(
  () => import("../pages/DispatcherPage/DispatcherPage")
);

// Declaring a PagesRoutes component:
const PagesRoutes: FC = () => {
  // Getting the dispatch func from the useAppDispatch hook:
  const dispatch = useAppDispatch();

  const authLoading = useAppSelector(authDataSelector);

  // useEffect to monitor changes in authentication state of the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Check is user exist
      if (user) {
        // Get user doc with user inforamiton
        const userDoc = await getUserDoc({ value: user.uid, valueName: "uid" });

        // Destructuring valies from user
        const { uid, email, phoneNumber } = user;

        // Dispatch data to state with state change user
        dispatch(
          authStateChangeUser({
            uid,
            displayName: userDoc?.userData?.displayName,
            email,
            stateChange: true,
            phoneNumber,
            role: userDoc.userData ? userDoc?.userData?.role : ROLES.PASSANGER,
          })
        );
      }
    });

    // Cleanup function
    return unsubscribe;
  }, [dispatch]);

  // If loading true return loader
  if (authLoading.loading) return <Loader />;

  // Return the router configuration with routes
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PRIVATE ROUTES */}

        {/* Admin Page */}
        <Route element={<PrivateRoute roles={adminRouteRoles} />}>
          <Route path={ROUTES.ADMIN} element={<AdminPage />} />
        </Route>

        {/* Dispatcher Page */}
        <Route element={<PrivateRoute roles={dispatcherRouteRoles} />}>
          <Route path={ROUTES.DISPATCHER} element={<DispatcherPage />} />
        </Route>

        {/* Trips Page */}
        <Route element={<PrivateRoute roles={tripsRouteRoles} />}>
          <Route path={ROUTES.TRIPS} element={<TripsPage />} />
        </Route>

        {/* Driver Page */}
        <Route element={<PrivateRoute roles={driverRouteRoles} />}>
          <Route path={ROUTES.DRIVER} element={<DriverPage />} />
        </Route>

        {/* Passanger Page */}
        <Route element={<PrivateRoute roles={passangerRouteRoles} />}>
          <Route path={ROUTES.PASSANGER} element={<PassangerPage />} />
        </Route>

        {/* Home as Auth Page */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.HOME} element={<AuthPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

// Export the PagesRoutes component:
export default PagesRoutes;
