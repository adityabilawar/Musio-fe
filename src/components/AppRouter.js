import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Meeting from "../pages/Meeting";
import Sample from "../pages/Sample";
import Instrument from "../pages/Instrument";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Instrument />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </Router>
  );
}
