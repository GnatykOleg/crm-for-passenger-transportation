import React, { FC, Suspense, lazy } from "react";

import { Routes, Route } from "react-router";

import { Spinner } from "react-bootstrap";

const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
const UserPage = lazy(() => import("../pages/UserPage/UserPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const PagesRoutes: FC = () => {
  return (
    <Suspense fallback={<Spinner animation="grow" />}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default PagesRoutes;
