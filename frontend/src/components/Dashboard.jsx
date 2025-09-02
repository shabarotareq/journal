import Header from "./Header";
import Sidebar from "./Sidebar";
import PalestinianReality from "./PalestinianReality";
import ARViewer from "./ARViewer";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* الخلفية الديناميكية */}
      <div className="fixed inset-0 dynamic-bg heritage-pattern opacity-20 pointer-events-none"></div>

      <Header />

      <div className="flex pt-20">
        <Sidebar />

        <main className="dashboard flex flex-1">
          <section className="dashboard-left flex-1 p-4">
            <PalestinianReality />
          </section>

          <section className="dashboard-right w-1/3 p-4">
            <div className="ar-section card shadow-lg rounded-2xl p-4">
              <h3 className="text-lg font-bold mb-2">نموذج ثلاثي الأبعاد</h3>
              <ARViewer
                modelUrl="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                poster=""
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
