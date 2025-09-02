import React from "react";

export default function ARViewer({ modelUrl, poster }) {
  if (!modelUrl) {
    return (
      <div className="card modelWrap">
        <p>لا يوجد نموذج ثلاثي الأبعاد لهذا الموقع بعد.</p>
      </div>
    );
  }
  return (
    <div className="modelWrap card">
      <model-viewer
        src={modelUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        poster={poster || ""}
        shadow-intensity="1"
        auto-rotate
      ></model-viewer>
    </div>
  );
}
