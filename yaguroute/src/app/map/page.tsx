'use client'

import React, { useState, useRef } from 'react'
import KakaoMap from '@/app/components/map/KakaoMap'
import iconHome from '@/images/map/icon-home.png'
import { useRouter } from 'next/navigation'

export default function MapPage() {
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState('')
  const kakaoMapRef = useRef<any>(null)

  const handleSearch = () => {
    if (kakaoMapRef.current && searchKeyword.trim()) {
      kakaoMapRef.current.searchPlaces(searchKeyword)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const onNavigateToHome = () => {
    router.push('/home')
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      {/* 상단 검색창 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'white',
          padding: '8px 16px',
          borderRadius: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          minWidth: '300px',
        }}
      >
        {/* 홈 버튼 */}
        <button
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={onNavigateToHome}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <img
            src={iconHome.src}
            alt="home"
            style={{ width: '32px', height: '32px' }}
          />
        </button>

        {/* 검색창 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '20px',
            padding: '8px 16px',
            border: '2px solid transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <span
            style={{
              color: '#666',
              marginRight: '8px',
              fontSize: '16px',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="관광지·맛집·카페 검색"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '16px',
              color: '#333',
            }}
          />
        </div>

        {/* 검색 버튼 */}
        <button
          onClick={handleSearch}
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e0e0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0'
          }}
        >
          <span style={{ color: '#666', fontSize: '14px' }}>→</span>
        </button>
      </div>

      {/* 지도 */}
      <KakaoMap
        ref={kakaoMapRef}
        width="100%"
        height="100vh"
        center={{ lat: 36.316537, lng: 127.431104 }}
        level={3}
        searchKeyword={searchKeyword}
        onSearchKeywordChange={setSearchKeyword}
      />
    </div>
  )
}