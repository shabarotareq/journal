import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsTicker from "./components/NewsTicker";
import AnalysisDashboard from "./components/AnalysisDashboard";
import NewsSection from "./components/NewsSection";
import VRStudio from "./components/VRStudio";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import Heritage from "./pages/Heritage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NewsTicker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/heritage" element={<Heritage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
