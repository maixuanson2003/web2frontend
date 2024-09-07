import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Login from "./Component/auth/Login";
import { useState } from "react";
import PrivateRoute from "./Component/auth/PrivateRoute";
import ChatApp from "./Component/main/ChatApp";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-700 ">
      <BrowserRouter basename="/web2">
        <Routes>
          <Route
            path="/chatapp"
            element={token ? <ChatApp /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              token ? <Navigate to="/chatapp" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
