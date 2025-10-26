'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/services/api'
import logo from '../../../public/logo.png'

export default function IndexPage() {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await login({ id, password })
      // 로그인 성공
      console.log('로그인 성공:', response)
      
      // 토큰 저장 (필요한 경우)
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken)
      }

      // 홈으로 이동
      router.push('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
      console.error('로그인 에러:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f7f5',
        padding: '20px 20px 60px',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {/* 로고/타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚾</div>
          <img src={logo.src} alt="야구루트 로고" width={140} height={20} style={{ display: 'block', margin: '0 auto 12px auto' }} />
          <p
            style={{
              fontSize: '14px',
              color: '#666',
              marginTop: '12px',
            }}
          >
            야구 팬들을 위한 여행 코스 가이드
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
              }}
            >
              아이디
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#FF6B35'
                e.currentTarget.style.backgroundColor = 'white'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#ddd'
                e.currentTarget.style.backgroundColor = '#f8f9fa'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
              }}
            >
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#FF6B35'
                e.currentTarget.style.backgroundColor = 'white'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#ddd'
                e.currentTarget.style.backgroundColor = '#f8f9fa'
              }}
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#ffebee',
                color: '#c62828',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#FF6B35',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#e55a2b'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#FF6B35'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
