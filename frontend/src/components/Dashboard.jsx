import React from "react";
import PalestinianReality from "./PalestinianReality";
import ARViewer from "./ARViewer";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <section className="dashboard-left">
        <PalestinianReality />
      </section>

      <section className="dashboard-right">
        <div className="ar-section card">
          <h3>نموذج ثلاثي الأبعاد</h3>
          <ARViewer
            modelUrl="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
            poster=""
          />
        </div>
      </section>
    </main>
  );
}
