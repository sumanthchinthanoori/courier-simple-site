import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tracking from "./pages/Tracking";
import TrackingPage from "./pages/TrackingPage";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel"; // 👈 Import Admin Panel
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <Router>
      <div className="min-h-screen pb-16 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/tracking/details" element={<TrackingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminPanel />} /> {/* 👈 Admin route added */}
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
