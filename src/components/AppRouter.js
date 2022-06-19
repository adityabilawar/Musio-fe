import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Sample from "../pages/Sample";
import Login2 from "../pages/Login2";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/Login2" element={<Login2 />} />
      </Routes>
    </Router>
  );
}
