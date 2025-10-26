'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, Search } from 'lucide-react'
import FloatingNav from '@/app/components/common/FloatingNav'
import iconPlayerActive from '@/images/map/icon-player-active.png'
import iconPlayers from '@/images/home/icon-players.png'
import CategoryTabs from '@/app/components/map/CategoryTabs'
import emptyImage from "@/images/map/empty.png"
import { dummyRoutes } from '@/data/routes'
import { Place } from '@/app/types/map'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'fan' | 'player'>('fan')
  const [places, setPlaces] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({ lat: 36.316537, lng: 127.431104 }) // 한화 야구장 기본 좌표

  // // 위치 정보 가져오기
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         })
  //       },
  //       (error) => {
  //         console.error('위치 정보를 가져올 수 없습니다:', error)
  //       }
  //     )
  //   }
  // }, [])

  // 팬 추천 데이터 로드 (전체: 맛집 + 카페 + 관광)
  const loadFanRecommendations = async () => {
    setIsLoading(true)
    try {
      const categories = ['MEAL', 'CAFE', 'TOUR']
      const promises = categories.map(async (category) => {
        const params = new URLSearchParams({
          type: 'CATEGORY',
          team: 'hanhwa',
          category: category,
          latitude: currentLocation.lat.toString(),
          longitude: currentLocation.lng.toString(),
          numberOfSuggestions: '10',
        })
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/suggestions?${params.toString()}`
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`)
        const data = await response.json()
        
        // API 응답 형식에 맞춰 Place 타입으로 변환
        const items = (data.items || []).map((item: any) => ({
          placeId: item.id || '',
          name: item.name || '',
          latitude: item.latitude ? parseFloat(item.latitude) : 0,
          longitude: item.longitude ? parseFloat(item.longitude) : 0,
          address: item.description || '',
          formattedAddress: item.description || '',
          photoUrls: item.imageUrl ? [item.imageUrl] : [],
          rating: null,
          reviews: [],
          types: [],
          businessStatus: '',
          openingHours: [],
          priceLevel: null,
          website: null,
          phoneNumber: null,
          distance: null,
          category: category === 'MEAL' ? '맛집' : category === 'CAFE' ? '카페' : '관광'
        }))
        
        return items
      })

      const results = await Promise.all(promises)
      const allPlaces = results.flat()
      setPlaces(allPlaces.slice(0, 10)) // 최대 10개만 표시
    } catch (error) {
      console.error(error)
      setPlaces([])
    } finally {
      setIsLoading(false)
    }
  }

  // 야구선수 맛집 데이터 로드
  const loadPlayerRestaurants = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        type: 'PLAYER_MAT_ZIP',
        team: 'hanhwa', // 기본 한화
      })
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/suggestions?${params.toString()}`
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`)
      const data = await response.json()
      
      // API 응답 형식에 맞춰 Place 타입으로 변환
      const items = (data.items || []).map((item: any) => ({
        placeId: item.id || '',
        name: item.name || '',
        latitude: item.latitude ? parseFloat(item.latitude) : 0,
        longitude: item.longitude ? parseFloat(item.longitude) : 0,
        address: item.description || '',
        formattedAddress: item.description || '',
        photoUrls: item.imageUrl ? [item.imageUrl] : [],
        rating: null,
        reviews: [],
        types: [],
        businessStatus: '',
        openingHours: [],
        priceLevel: null,
        website: null,
        phoneNumber: null,
        distance: null,
        category: '한화 이글스 맛집'
      }))
      
      setPlaces(items.slice(0, 10))
    } catch (error) {
      console.error(error)
      setPlaces([])
    } finally {
      setIsLoading(false)
    }
  }

  // 탭 변경 시 데이터 로드
  useEffect(() => {
    if (activeTab === 'fan') {
      loadFanRecommendations()
    } else {
      loadPlayerRestaurants()
    }
  }, [activeTab, currentLocation])

  // 카테고리 한글 변환
  const getCategoryLabel = (place: Place) => {
    if (activeTab === 'player') {
      return '한화 이글스 맛집'
    }
    // 팬 추천의 경우 카테고리 표시
    return place.category || '추천'
  }

  return (
    <div
      style={{
        backgroundColor: '#f9f7f5',
        height: '100vh',
        overflow: 'hidden',
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
          <span style={{ fontWeight: 'bold' }}>한화생명 이글스파크</span>
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
              fontSize: '16px',
            }}
          />
        </div>
      </div>

      {/* 추천 섹션 */}
      <section style={{ padding: '0 16px', flex: 1, overflowY: 'auto' }}>
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {isLoading ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '14px' }}>로딩 중...</div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px' }}>
            {places.map((place, index) => (
              <div
                key={`${place.name}-${index}`}
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
                  {place.imageUrl ? (
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e9ecef',
                        color: '#999',
                        fontSize: '12px',
                      }}
                    >
                      <img
                        src={place.imageUrl || emptyImage.src}
                        alt={place.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
                <div style={{ padding: '8px 12px', textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {place.name}{' '}
                    <span style={{ fontSize: '12px', fontWeight: 400, color: '#999' }}>
                      {getCategoryLabel(place)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      marginTop: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {place.description || '주소 정보 없음'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 내 야구루트 */}
        <div style={{ padding: '28px 0' }}>
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
        </div>
      </section>

      <FloatingNav />
    </div>
  )
}