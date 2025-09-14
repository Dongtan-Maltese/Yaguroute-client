'use client'

import React from 'react'
import { Search, Home, User } from 'lucide-react'
import FloatingNav from '../components/common/FloatingNav'

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#f9f7f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 상단 영역 */}
      <header
        style={{
          padding: '16px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>잠실 야구장</span>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#ff6b35',
            }}
          />
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
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          팬추천 BEST · 야구선수 맛집
        </h3>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
          {['만두 냉면', '구이구이쭈갈비', '구수한 해장국'].map((title, i) => (
            <div
              key={i}
              style={{
                minWidth: '180px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ height: '100px', backgroundColor: '#ddd' }} />
              <div style={{ padding: '8px 12px', textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{title}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>가게 위치 설명</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 내 야구루트 */}
      <section style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>내 야구루트</h3>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>8/2 고척 스카이돔</div>
          <div style={{ fontWeight: 'bold' }}>빵생빵사! 빵에 인생 걸었냐?</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            둥 대전역 - 성심당 - 만수 불고기 - 탕정역 - 한화생명
          </div>
        </div>
      </section>

      {/* 하단 네비게이션 */}
      <FloatingNav />
    </div>
  )
}
