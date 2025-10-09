'use client'

import React from 'react'
import { ChevronRight, Search } from 'lucide-react'
import FloatingNav from '@/app/components/common/FloatingNav'
import iconPlayerActive from '@/images/map/icon-player-active.png'
import iconPlayers from '@/images/home/icon-players.png'
import CategoryTabs from '@/app/components/map/CategoryTabs'
import { dummyPlaces } from '@/data/playerRecommendPlace'
import { dummyRoutes } from '@/data/routes'

export default function HomePage() {
  return (
    <div
      style={{
        backgroundColor: '#f9f7f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '16px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>잠실 야구장</span>
          <img src={iconPlayerActive.src} style={{ width: '32px', height: '32px' }}/>
        </div>
        <div
          style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#f1f3f5',
            borderRadius: '12px',
            fontSize: '14px',
            textAlign: 'left',
          }}
        >
          <div style={{ color: '#666' }}>지금 경기장 날씨</div>
          <div style={{ fontWeight: 'bold', marginTop: '4px' }}>
            하늘은 흐림, 상대팀 미래도 흐림 좋겠네
          </div>
        </div>
      </header>

      {/* 검색창 */}
      <div style={{ padding: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '8px 12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          <Search size={18} color="#888" />
          <input
            placeholder="이번 직관, 어디를 들러볼까요?"
            style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              marginLeft: '8px',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* 추천 섹션 */}
      <section style={{ padding: '0 16px' }}>
        <CategoryTabs />
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
          {dummyPlaces.map((place) => (
            <div
              key={place.id}
              style={{
                width: '160px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '120px',
                  backgroundColor: '#ddd',
                }}
              >
                <img
                  src={place.image}
                  alt={place.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {place.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      backgroundColor: '#ff4500',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '4px 6px',
                      borderRadius: '6px',
                    }}
                  >
                    {place.badge}
                  </div>
                )}
              </div>
              <div style={{ padding: '8px 12px', textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {place.title}{' '}
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#999' }}>
                    {place.category}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {place.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 내 야구루트 */}
      <section style={{ padding: '28px 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '19px', fontWeight: 'bold' }}>내 야구루트</div>
            <ChevronRight size={20} color="#888" />
          </div>
          <img src={iconPlayers.src} alt="players" style={{ position: 'absolute', right: 24, width: '92px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dummyRoutes.map((route) => (
            <div
              key={route.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{route.date}</div>
              <div style={{ fontWeight: 'bold' }}>{route.title}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{route.path}</div>
            </div>
          ))}
        </div>
      </section>

      <FloatingNav />
    </div>
  )
}
