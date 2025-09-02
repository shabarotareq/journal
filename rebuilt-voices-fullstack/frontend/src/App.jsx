
import React, { useEffect, useState } from 'react'
import MapView from './components/MapView'
import ARViewer from './components/ARViewer'
import SiteCard from './components/SiteCard'
import UploadForm from './components/UploadForm'
import { listSites, login, register } from './api'

export default function App() {
  const [sites, setSites] = useState([])
  const [active, setActive] = useState(null)
  const [token, setToken] = useState(null)
  const [creds, setCreds] = useState({ email:'demo@example.com', password:'demo1234' })

  async function ensureAuth() {
    try {
      const t = await login(creds.email, creds.password)
      setToken(t.access_token)
    } catch(e) {
      const t = await register({ email:creds.email, password:creds.password, full_name:'Demo' })
      setToken(t.access_token)
    }
  }

  async function refreshSites() {
    const data = await listSites()
    setSites(data)
    if (!active && data.length) setActive(data[0])
  }

  useEffect(() => { ensureAuth().then(refreshSites) }, [])

  return (
    <>
      <header>
        <div className="container">
          <h1 style={{margin:0}}>أصوات مرمّمة — سرد الذاكرة عبر الواقع المعزز</h1>
          <p style={{opacity:.9, marginTop:6}}>منصة تفاعلية لإحياء المواقع الممحية عبر قصص ومواد أرشيفية وAR</p>
        </div>
      </header>

      <main className="container" style={{display:'grid', gap:16, gridTemplateColumns:'1.2fr 1fr'}}>
        <div className="grid">
          <MapView sites={sites} onSelect={setActive} />
          {active && <ARViewer modelUrl={(active.media||[]).find(m => m.type==='model3d')?.file_path || ''} />}
          {token && <UploadForm token={token} onCreated={refreshSites} />}
        </div>
        <div className="grid">
          <div className="card">
            <h2 style={{marginTop:0}}>المواقع</h2>
            <div className="grid">
              {sites.map(s => <SiteCard key={s.id} site={s} onOpen={setActive} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
