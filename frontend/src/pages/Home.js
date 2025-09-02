import React from "react";
import AnalysisDashboard from "../components/AnalysisDashboard";
import NewsSection from "../components/NewsSection";
import VRStudio from "../components/VRStudio";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <AnalysisDashboard />
      <NewsSection />
      <VRStudio />
      <Sidebar />
    </div>
  );
};

export default Home;
