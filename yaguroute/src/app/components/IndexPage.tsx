'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function IndexPage() {
  const router = useRouter()

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '16px',
          }}
        >
          야구 팬을 위한 맛집 가이드
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.5',
          }}
        >
          팬들이 추천하는 맛집과 야구선수들이 자주 찾는 맛집을
          <br />
          지도에서 쉽게 찾아보세요!
        </p>
      </div>

      <button
        onClick={() => {
          router.push('/map')
        }}
        style={{
          padding: '16px 32px',
          backgroundColor: '#FF6B35',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e55a2b'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FF6B35'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        🗺️ 지도에서 맛집 찾기
      </button>

      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            minWidth: '200px',
          }}
          onClick={() => {
            router.push('/home')
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏠</div>
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            홈
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            야구루트의 홈 화면!
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            minWidth: '200px',
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚾</div>
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            커뮤니티
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            팬들과 소통하는 커뮤니티
          </p>
        </div>

        {/* 야구루트 제조 */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            minWidth: '200px',
          }}
          onClick={() => {
            router.push('/recommend')
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧪</div>
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            야구루트 제조
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            야구장 근처 여행 코스
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            minWidth: '200px',
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏟️</div>
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            마이페이지
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            내 정보 관리
          </p>
        </div>
      </div>
    </div>
  )
}
