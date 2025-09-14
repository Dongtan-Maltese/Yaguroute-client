'use client'

import React from 'react'
import { Home, MapPin, MessageSquare } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { href: '/home', icon: <Home size={20} />, label: '홈' },
  { href: '/map', icon: <MapPin size={20} />, label: '지도' },
  { href: '/community', icon: <MessageSquare size={20} />, label: '커뮤니티' },
]

export default function FloatingNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1a1a1a',
        borderRadius: '40px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      {navItems.map(({ href, icon, label }) => {
        const isActive = pathname === href
        return (
          <button
            key={label}
            onClick={() => router.push(href)}
            style={{
              background: isActive ? 'white' : 'none',
              border: 'none',
              color: isActive ? 'black' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {icon}
          </button>
        )
      })}

      {/* CTA 버튼 */}
      <button
        style={{
          backgroundColor: '#FF6B35',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: '24px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        ✨ 야구루트 제조
      </button>
    </div>
  )
}
