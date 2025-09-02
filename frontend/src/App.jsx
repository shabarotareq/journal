import About from "./pages/About";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // إزالة BrowserRouter من هنا

// المكونات
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PalestinianReality from "./components/PalestinianReality";

// الصفحات
import Home from "./pages/Home";
import HeritageProjects from "./pages/HeritageProjects";
import VRRoom from "./pages/VRRoom";
import AIHelper from "./pages/AIHelper";
import News from "./pages/News";
import PressServices from "./pages/PressServices";
import StaffManagement from "./pages/StaffManagement";
import Finance from "./pages/Finance";
import MediaLibrary from "./pages/MediaLibrary";
import Training from "./pages/Training";
import Institutions from "./pages/Institutions";
import Settings from "./pages/Settings";

// الأنماط
import "./App.css";

function App() {
  return (
    // إزالة <Router> من هنا تماماً
    <div className="app-shell" dir="rtl">
      <Header />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-1 mr-80 p-8 page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/palestinian-reality"
              element={<PalestinianReality />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/heritage-projects" element={<HeritageProjects />} />
            <Route path="/vr-room" element={<VRRoom />} />
            <Route path="/ai-helper" element={<AIHelper />} />
            <Route path="/news" element={<News />} />
            <Route path="/press-services" element={<PressServices />} />
            <Route path="/staff-management" element={<StaffManagement />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/media-library" element={<MediaLibrary />} />
            <Route path="/training" element={<Training />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
