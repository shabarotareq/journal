
import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapView({ sites=[], onSelect }) {
  const ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if(!ref.current || mapRef.current) return
    const map = L.map(ref.current).setView([31.5, 34.47], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map)
    mapRef.current = map
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if(!map) return
    // clear layers first
    map.eachLayer(layer => { if(layer instanceof L.Marker) map.removeLayer(layer) })
    sites.forEach(s => {
      const m = L.marker([s.latitude, s.longitude]).addTo(map).bindPopup(`<b>${s.title}</b>`)
      m.on('click', () => onSelect && onSelect(s))
    })
  }, [sites])

  return <div className="map card" ref={ref}></div>
}
