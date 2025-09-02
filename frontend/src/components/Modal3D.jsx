export default function Modal3D({ isOpen, onClose, modelUrl, poster }) {
  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {modelUrl ? (
          <model-viewer
            src={modelUrl}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            poster={poster || ""}
            shadow-intensity="1"
            auto-rotate
            style={{ width: "100%", height: "80vh", borderRadius: "16px" }}
          ></model-viewer>
        ) : (
          <div className="modal-empty">لا يوجد نموذج ثلاثي الأبعاد.</div>
        )}
      </div>
    </div>
  );
}
