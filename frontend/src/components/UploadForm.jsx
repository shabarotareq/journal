
import React, { useState } from 'react'
import { createSite, uploadMedia } from '../api'

export default function UploadForm({ token, onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [lat, setLat] = useState(31.5)
  const [lng, setLng] = useState(34.47)
  const [modelFile, setModelFile] = useState(null)

  async function submit(e) {
    e.preventDefault()
    const sitePayload = {
      title, description,
      latitude: parseFloat(lat), longitude: parseFloat(lng),
      media: []
    }
    const site = await createSite(token, sitePayload)
    if (modelFile) {
      await uploadMedia(token, site.id, 'model3d', modelFile, 'AR model')
    }
    onCreated && onCreated(site)
    setTitle(''); setDescription(''); setModelFile(null)
  }

  return (
    <form className="card" onSubmit={submit} style={{display:'grid', gap:12}}>
      <h3 style={{margin:0}}>إضافة موقع جديد</h3>
      <label>العنوان<input value={title} onChange={e=>setTitle(e.target.value)} required/></label>
      <label>الوصف<textarea rows={3} value={description} onChange={e=>setDescription(e.target.value)} /></label>
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <label>خط العرض<input type="number" step="0.000001" value={lat} onChange={e=>setLat(e.target.value)} /></label>
        <label>خط الطول<input type="number" step="0.000001" value={lng} onChange={e=>setLng(e.target.value)} /></label>
      </div>
      <label>ملف نموذج ثلاثي الأبعاد (اختياري .glb/.gltf)<input type="file" accept=".glb,.gltf" onChange={e=>setModelFile(e.target.files[0])} /></label>
      <button className="btn" type="submit">حفظ</button>
    </form>
  )
}
