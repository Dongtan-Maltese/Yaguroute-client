'use client'

import React from 'react'
import iconPlayer from '@/images/map/icon-player.png'
import iconPlayerActive from '@/images/map/icon-player-active.png'

interface CategoryTabsProps {
  activeTab: 'fan' | 'player'
  onTabChange: (tab: 'fan' | 'player') => void
}

const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const tabs = [
    {
      key: 'fan' as const,
      label: '팬추천 BEST',
      icon: iconPlayer,
      activeIcon: iconPlayerActive,
    },
    {
      key: 'player' as const,
      label: '야구선수 맛집',
      icon: iconPlayer,
      activeIcon: iconPlayerActive,
    },
  ]

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        margin: '16px 0',
      }}
    >
      {tabs.map(({ key, label, icon, activeIcon }) => {
        const isActive = activeTab === key
        return (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            style={{
              width: "fit-content",
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 12px',
              borderRadius: '9999px',
              border: isActive ? 'none' : '1px solid #ddd',
              backgroundColor: isActive ? '#222' : '#fff',
              color: isActive ? '#fff' : '#666',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src={isActive ? activeIcon.src : icon.src}
              alt={label}
              style={{ width: 20, height: 20 }}
            />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs