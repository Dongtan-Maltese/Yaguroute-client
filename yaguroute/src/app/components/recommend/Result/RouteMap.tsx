"use client"

import React, { useEffect, useRef } from 'react'
import iconMarker from '@/images/map/icon-marker.png'
import iconMarkerActive from '@/images/map/icon-marker-active.png'

declare global {
  interface Window {
    kakao: any
  }
}

const KAKAOMAP_APPKEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY

export type MapPoint = {
  lat: number
  lng: number
  title: string
}

export default function RouteMap({ points }: { points: MapPoint[] }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_APPKEY}&autoload=false`
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`)

    function loadKakao(callback: () => void) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(callback)
        return
      }
      if (script) {
        script.addEventListener('load', () => window.kakao.maps.load(callback), { once: true })
        return
      }
      script = document.createElement('script')
      script.async = true
      script.src = src
      document.head.appendChild(script)
      script.addEventListener('load', () => window.kakao.maps.load(callback), { once: true })
    }

    function initMap() {
      if (!mapRef.current) return
      const first = points[0] ?? { lat: 37.5665, lng: 126.978, title: '서울' }
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(first.lat, first.lng),
        level: 5,
      })

      const bounds = new window.kakao.maps.LatLngBounds()
      const path: any[] = []

      points.forEach((p, idx) => {
        const pos = new window.kakao.maps.LatLng(p.lat, p.lng)
        bounds.extend(pos)
        path.push(pos)

        const image = new window.kakao.maps.MarkerImage(
          idx === 0 || idx === points.length - 1
            ? iconMarkerActive.src
            : iconMarker.src,
          new window.kakao.maps.Size(28, 28)
        )

        const marker = new window.kakao.maps.Marker({ position: pos, image })
        marker.setMap(map)

        const iw = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:6px 8px;font-size:12px;">${idx + 1}. ${p.title}</div>`,
        })
        // open initially
        iw.open(map, marker)
        // keep click to re-open
        window.kakao.maps.event.addListener(marker, 'click', () => iw.open(map, marker))
      })

      if (path.length >= 2) {
        const polyline = new window.kakao.maps.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: '#111111',
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
        })
        polyline.setMap(map)
      }

      if (!bounds.isEmpty()) {
        map.setBounds(bounds)
      }
    }

    loadKakao(initMap)
  }, [points])

  return <div ref={mapRef} style={{ width: '100%', height: 360, borderRadius: 16, overflow: 'hidden' }} />
}
