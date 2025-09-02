
import React from 'react'

export default function SiteCard({ site, onOpen }) {
  return (
    <div className="card" style={{display:'flex', gap:16, alignItems:'flex-start'}}>
      <div style={{flex:1}}>
        <h3 style={{margin:'4px 0 8px', color:'#111827'}}>{site.title}</h3>
        <div style={{fontSize:14, color:'#4b5563'}}>{site.description || '—'}</div>
        <div style={{marginTop:8}}>
          {site.media?.map(m => <span className="tag" key={m.id || m.url}>{m.type}</span>)}
        </div>
        <button className="btn" style={{marginTop:12}} onClick={() => onOpen(site)}>فتح</button>
      </div>
    </div>
  )
}
