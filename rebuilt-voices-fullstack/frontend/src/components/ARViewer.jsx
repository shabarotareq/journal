
import React from 'react'

/**
 * ARViewer
 * - Displays a 3D model via <model-viewer> when a GLB/GLTF url is provided.
 * - Otherwise shows a fallback image or message.
 */
export default function ARViewer({ modelUrl, poster }) {
  if (!modelUrl) {
    return (
      <div className="card">
        <p>لا يوجد نموذج ثلاثي الأبعاد لهذا الموقع بعد.</p>
      </div>
    )
  }
  return (
    <div className="modelWrap card">
      <model-viewer src={modelUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        poster={poster || ''}
        shadow-intensity="1"
        auto-rotate>
      </model-viewer>
    </div>
  )
}
