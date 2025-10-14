'use client'

import React, { useState, useEffect } from 'react'
import iconPlayerActive from '@/images/map/icon-player-active.png'
import iconPlayer from '@/images/map/icon-player.png'
import TeamSelector from '@/app/components/map/TeamSelector'
import PlaceList from '@/app/components/map/PlaceList'
import FloatingButton from '@/app/components/common/FloatingButton'
import { Place } from '@/app/types/map'
import PlaceDetail from '@/app/components/map/PlaceDetail'

interface SearchBottomSheetProps {
  isVisible: boolean
  searchResults: Place[]
  onClose: () => void
  onPlaceSelect: (place: Place) => void
  viewMode: 'map' | 'list'
  onViewModeChange: (mode: 'map' | 'list') => void
  currentKeyword: string
  currentLocation: { lat: number; lng: number }
  onTeamSearchRequest?: (team: string) => void
}

interface BaseballTeam {
  name: string
  code: string
  logo: string
  color: string
}

const baseballTeams: BaseballTeam[] = [
  { name: '한화 이글스', code: 'hanhwa', logo: 'Eagles', color: '#FC4E00' },
  { name: 'LG 트윈스', code: 'lg', logo: 'Twins', color: '#C30452' },
  { name: '키움 히어로즈', code: 'kiwoom', logo: 'Heroes', color: '#6E1A29' },
  { name: 'SSG 랜더스', code: 'ssg', logo: 'Landers', color: '#CE0E2D' },
  { name: 'KT 위즈', code: 'kt', logo: 'wiz', color: '#3E3E3E' },
  { name: '삼성 라이온즈', code: 'samsung', logo: 'Lions', color: '#074CA1' },
  { name: '롯데 자이언츠', code: 'lotte', logo: 'Giants', color: '#00357E' },
  { name: 'NC 다이노스', code: 'nc', logo: 'Dinos', color: '#315288' },
  { name: 'KIA 타이거즈', code: 'kia', logo: 'Tigers', color: '#EA0029' },
  { name: '두산 베어스', code: 'doosan', logo: 'Bears', color: '#383284' },
]

export default function SearchBottomSheet({
  isVisible,
  searchResults,
  onClose,
  onPlaceSelect,
  viewMode,
  onViewModeChange,
  currentKeyword,
  currentLocation,
  onTeamSearchRequest,
}: SearchBottomSheetProps) {
  const [activeTab, setActiveTab] = useState<'fan' | 'baseball'>('fan')
  const [selectedTeam, setSelectedTeam] = useState<BaseballTeam>(baseballTeams[0])
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const [baseballRestaurants, setBaseballRestaurants] = useState<Place[]>([])
  const [isLoadingBaseball, setIsLoadingBaseball] = useState(false)

  const fanCategories = ['전체', '맛집', '카페', '관광']
  const [fanCategory, setFanCategory] = useState('전체')
  const [filteredFanResults, setFilteredFanResults] = useState<Place[]>([])
  const [isLoadingFan, setIsLoadingFan] = useState(false)

  // ✅ 선택된 장소 상태
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  // 팬 추천 API 로드
  const loadFanCategoryResults = async (category: string) => {
    if (category === '전체') {
      setFilteredFanResults(searchResults)
      return
    }
    setIsLoadingFan(true)
    try {
      const params = new URLSearchParams({ keyword: category })
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/keyword?${params.toString()}`
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`)
      const data = await response.json()
      setFilteredFanResults(data.items || [])
    } catch (error) {
      console.error(error)
      setFilteredFanResults([])
    } finally {
      setIsLoadingFan(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'fan') loadFanCategoryResults(fanCategory)
  }, [fanCategory, activeTab])

  const loadBaseballRestaurants = async (teamCode: string) => {
    setIsLoadingBaseball(true)
    try {
      const params = new URLSearchParams({
        type: 'PLAYER_MAT_ZIP',
        team: teamCode,
      })
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/suggestions?${params.toString()}`
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`)
      const data = await response.json()
      setBaseballRestaurants(data.items || [])
    } catch (error) {
      console.error(error)
      setBaseballRestaurants([])
    } finally {
      setIsLoadingBaseball(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'baseball' && isVisible) loadBaseballRestaurants(selectedTeam.code)
  }, [activeTab, selectedTeam.code, isVisible])

  useEffect(() => {
    if (activeTab === 'fan') setBaseballRestaurants([])
  }, [activeTab])

  if (!isVisible) return null

  const currentData = activeTab === 'fan' ? filteredFanResults : baseballRestaurants

  const handleTeamSelect = (team: BaseballTeam) => {
    setSelectedTeam(team)
    setShowTeamSelector(false)
  }

  const handleTabChange = (tab: 'fan' | 'baseball') => {
    setActiveTab(tab)
    setSelectedPlace(null) // 탭 변경 시 상세 선택 해제
    if (tab === 'baseball' && onTeamSearchRequest) onTeamSearchRequest(selectedTeam.code)
  }

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place)
    onPlaceSelect(place)
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
          maxHeight: '60%',
          overflowY: 'auto',
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* 핸들 */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: '#ddd',
            borderRadius: '2px',
            margin: '12px auto',
            cursor: 'pointer',
          }}
          onClick={onClose}
        />

        {/* ✅ 상세보기 모드 */}
        {selectedPlace ? (
          <PlaceDetail place={selectedPlace} onBack={() => setSelectedPlace(null)} />
        ) : (
          <>
            {/* 탭 헤더 */}
            <div
              style={{
                display: 'flex',
                padding: '0 20px',
                borderBottom: '1px solid #eee',
                marginBottom: '16px',
              }}
            >
              <button
                onClick={() => handleTabChange('fan')}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                  fontWeight: activeTab === 'fan' ? 'bold' : 'normal',
                  color: activeTab === 'fan' ? '#FF6B35' : '#666',
                  borderBottom: activeTab === 'fan' ? '2px solid #FF6B35' : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <img
                  src={activeTab === 'fan' ? iconPlayerActive.src : iconPlayer.src}
                  alt="팬 추천"
                  style={{ width: '20px', height: '20px' }}
                />
                팬 추천 BEST
              </button>
              <button
                onClick={() => handleTabChange('baseball')}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                  fontWeight: activeTab === 'baseball' ? 'bold' : 'normal',
                  color: activeTab === 'baseball' ? '#FF6B35' : '#666',
                  borderBottom:
                    activeTab === 'baseball' ? '2px solid #FF6B35' : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <img
                  src={activeTab === 'baseball' ? iconPlayerActive.src : iconPlayer.src}
                  alt="야구선수 맛집"
                  style={{ width: '20px', height: '20px' }}
                />
                야구선수 맛집
              </button>
            </div>

            {/* 팬 추천 칩 영역 */}
            {activeTab === 'fan' && (
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  padding: '0 20px 12px 20px',
                  whiteSpace: 'nowrap',
                }}
              >
                {fanCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFanCategory(category)}
                    style={{
                      flexShrink: 0,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: fanCategory === category ? '1px solid #FF6B35' : '1px solid #ddd',
                      backgroundColor: fanCategory === category ? '#FFF3EE' : 'white',
                      color: fanCategory === category ? '#FF6B35' : '#555',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* 구단 선택 (야구선수 맛집 전용) */}
            {activeTab === 'baseball' && (
              <div style={{ padding: '0 20px 16px 20px' }}>
                <button
                  onClick={() => setShowTeamSelector(true)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: selectedTeam.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {selectedTeam.logo}
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>{selectedTeam.name}</span>
                  </div>
                  <span style={{ color: '#666', fontSize: '14px' }}>▼</span>
                </button>
              </div>
            )}

            {/* 로딩 */}
            {(isLoadingBaseball || isLoadingFan) && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '14px' }}>검색 중입니다...</div>
              </div>
            )}

            {/* 장소 리스트 */}
            {!isLoadingBaseball && !isLoadingFan && currentData.length > 0 && (
              <PlaceList places={currentData} onPlaceSelect={handlePlaceSelect} />
            )}

            {/* 결과 없음 */}
            {!isLoadingBaseball &&
              !isLoadingFan &&
              currentData.length === 0 && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
                  <div style={{ fontSize: '16px', marginBottom: '8px' }}>검색 결과가 없습니다</div>
                  <div style={{ fontSize: '14px' }}>
                    {activeTab === 'baseball' ? '다른 구단을 선택해보세요' : '다른 키워드를 선택해보세요'}
                  </div>
                </div>
              )}

            {/* 구단 선택 모달 */}
            <TeamSelector
              isVisible={showTeamSelector}
              teams={baseballTeams}
              selectedTeam={selectedTeam}
              onTeamSelect={handleTeamSelect}
              onClose={() => setShowTeamSelector(false)}
            />
          </>
        )}
      </div>

      {/* 플로팅 버튼 */}
      {viewMode === 'list' && onViewModeChange && (
        <FloatingButton label="지도보기" icon="🗺️" onClick={() => onViewModeChange('map')} />
      )}

      {viewMode === 'map' &&
        onViewModeChange &&
        currentData.length > 0 &&
        !isLoadingBaseball &&
        !isLoadingFan && (
          <FloatingButton label="목록보기" icon="📋" onClick={() => onViewModeChange('list')} />
        )}
    </>
  )
}
