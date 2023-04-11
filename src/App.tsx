import React from "react";
import PagesRoutes from "./pages-routes/PagesRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <PagesRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
