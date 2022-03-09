import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Products } from "./uploadfiles/pages/Products";
import Login from "./uploadfiles/pages/login";
import Register from "./uploadfiles/pages/Register";
import { AuthProvider } from "./uploadfiles/context/auth";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Products />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="/account">
            <Route index element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
