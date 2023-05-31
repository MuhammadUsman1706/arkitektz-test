import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navigation/Navbar";
import AuthPage from "./pages/AuthPage";
import ProductsListPage from "./pages/ProductsListPage";
import AddProductPage from "./pages/AddProductPage";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const { isLoggedIn, canEditOrCreate } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <ToastContainer />
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {isLoggedIn && (
          <Fragment>
            <Route path="/products" element={<ProductsListPage />} />
            {canEditOrCreate && (
              <Route path="/add-product" element={<AddProductPage />} />
            )}
          </Fragment>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}

export default App;
