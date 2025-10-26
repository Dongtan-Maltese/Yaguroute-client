'use client'

import React, { useState, useEffect, useRef } from 'react'
import PlaceList from '@/app/components/map/PlaceList'
import FloatingButton from '@/app/components/common/FloatingButton'
import { Place } from '@/app/types/map'
import PlaceDetail from '@/app/components/map/PlaceDetail'
import WriteReview from '@/app/components/map/WriteReview'

interface SearchResultBottomSheetProps {
  searchKeyword: string
  onClose: () => void
  onPlaceSelect: (place: Place) => void
  viewMode: 'map' | 'list'
  onViewModeChange: (mode: 'map' | 'list') => void
}

export default function SearchResultBottomSheet({
  searchKeyword,
  onClose,
  onPlaceSelect,
  viewMode,
  onViewModeChange,
}: SearchResultBottomSheetProps) {
  const [searchResults, setSearchResults] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [lastSearchKeyword, setLastSearchKeyword] = useState('')

  // 바텀시트 상태 관리
  const [isExpanded, setIsExpanded] = useState(true) // 검색 결과는 기본적으로 열린 상태
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragStartHeight, setDragStartHeight] = useState(0)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0)

  // 높이 상태 정의
  const CLOSED_HEIGHT = 150 // 닫힌 상태 높이
  const getExpandedHeight = () => (typeof window !== 'undefined' ? window.innerHeight * 0.5 : 300)
  const getFullscreenHeight = () => (typeof window !== 'undefined' ? window.innerHeight - 10 : 600)

  // 초기 높이 설정 - 검색 결과는 열린 상태로 시작
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBottomSheetHeight(getExpandedHeight())
    }
  }, [])

  // 검색 실행
  useEffect(() => {
    if (searchKeyword.trim() && searchKeyword !== lastSearchKeyword) {
      loadSearchResults(searchKeyword)
    }
  }, [searchKeyword])

  // 중복 제거 함수
  const removeDuplicates = (places: Place[]) => {
    const seen = new Set<string>()
    return places.filter((place) => {
      const key = `${place.latitude},${place.longitude}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  const loadSearchResults = async (keyword: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ keyword })
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/keyword?${params.toString()}`
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`)
      const data = await response.json()
      setSearchResults(removeDuplicates(data.items || []))
      setLastSearchKeyword(keyword)
    } catch (error) {
      console.error('검색 중 오류 발생:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // 드래그 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    setDragStartY(e.clientY)
    setDragStartHeight(bottomSheetHeight)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    setDragStartY(e.touches[0].clientY)
    setDragStartHeight(bottomSheetHeight)
  }

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const deltaY = dragStartY - e.clientY
      const newHeight = Math.max(
        CLOSED_HEIGHT,
        Math.min(getFullscreenHeight(), dragStartHeight + deltaY)
      )
      setBottomSheetHeight(newHeight)
    },
    [dragStartY, dragStartHeight]
  )

  const handleTouchMove = React.useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      const deltaY = dragStartY - e.touches[0].clientY
      const newHeight = Math.max(
        CLOSED_HEIGHT,
        Math.min(getFullscreenHeight(), dragStartHeight + deltaY)
      )
      setBottomSheetHeight(newHeight)
    },
    [dragStartY, dragStartHeight]
  )

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false)

    setBottomSheetHeight((prevHeight) => {
      if (prevHeight < CLOSED_HEIGHT + 50) {
        setIsExpanded(false)
        onClose() // 닫기
        return CLOSED_HEIGHT
      } else if (prevHeight > getFullscreenHeight() * 0.8) {
        setIsExpanded(true)
        return getFullscreenHeight()
      } else {
        setIsExpanded(true)
        return getExpandedHeight()
      }
    })
  }, [onClose])

  const handleTouchEnd = React.useCallback(() => {
    setIsDragging(false)

    setBottomSheetHeight((prevHeight) => {
      if (prevHeight < CLOSED_HEIGHT + 50) {
        setIsExpanded(false)
        onClose() // 닫기
        return CLOSED_HEIGHT
      } else if (prevHeight > getFullscreenHeight() * 0.8) {
        setIsExpanded(true)
        return getFullscreenHeight()
      } else {
        setIsExpanded(true)
        return getExpandedHeight()
      }
    })
  }, [onClose])

  // 전역 이벤트 리스너 등록
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e)
    const handleMouseUpWrapper = () => handleMouseUp()
    const handleTouchMoveWrapper = (e: TouchEvent) => handleTouchMove(e)
    const handleTouchEndWrapper = () => handleTouchEnd()

    document.addEventListener('mousemove', handleMouseMoveWrapper)
    document.addEventListener('mouseup', handleMouseUpWrapper)
    document.addEventListener('touchmove', handleTouchMoveWrapper, { passive: false })
    document.addEventListener('touchend', handleTouchEndWrapper)

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWrapper)
      document.removeEventListener('mouseup', handleMouseUpWrapper)
      document.removeEventListener('touchmove', handleTouchMoveWrapper)
      document.removeEventListener('touchend', handleTouchEndWrapper)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const handleViewModeChange = (mode: 'map' | 'list') => {
    onViewModeChange(mode)
    if (mode === 'list') {
      setBottomSheetHeight(getExpandedHeight())
      setIsExpanded(true)
    } else {
      setBottomSheetHeight(CLOSED_HEIGHT)
      setIsExpanded(false)
    }
  }

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place)
    onPlaceSelect(place)
  }

  const handleToggleExpanded = () => {
    if (isExpanded) {
      setBottomSheetHeight(CLOSED_HEIGHT)
      setIsExpanded(false)
    } else {
      setBottomSheetHeight(getExpandedHeight())
      setIsExpanded(true)
    }
  }

  return (
    <>
      <div
        ref={bottomSheetRef}
        style={{
          position: 'absolute',
          bottom: 0,
          top: bottomSheetHeight >= getFullscreenHeight() ? '0' : 'auto',
          left: 0,
          right: 0,
          zIndex: 1001, // SearchBottomSheet보다 높은 z-index
          backgroundColor: '#F4F1EC',
          borderTopLeftRadius: bottomSheetHeight >= getFullscreenHeight() ? '0px' : '20px',
          borderTopRightRadius: bottomSheetHeight >= getFullscreenHeight() ? '0px' : '20px',
          boxShadow:
            bottomSheetHeight >= getFullscreenHeight()
              ? 'none'
              : '0 -4px 20px rgba(0,0,0,0.15)',
          height: bottomSheetHeight >= getFullscreenHeight() ? '100%' : `${bottomSheetHeight}px`,
          overflowY: 'auto',
          transition: isDragging
            ? 'none'
            : 'height 0.3s ease-in-out, border-radius 0.3s ease-in-out, top 0.3s ease-in-out',
        }}
      >
        {/* 핸들 또는 전체화면 헤더 */}
        {bottomSheetHeight < getFullscreenHeight() ? (
          <div
            style={{
              width: '100%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* 뒤로가기 버튼 (항상 표시) */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (selectedPlace) {
                  setSelectedPlace(null)
                } else {
                  onClose() // SearchBottomSheet로 돌아가기
                }
              }}
              style={{
                position: 'absolute',
                left: '20px',
                width: '32px',
                height: '32px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              ←
            </button>
            <div
              style={{
                width: '60px',
                height: '5px',
                backgroundColor: '#ddd',
                borderRadius: '3px',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              borderBottom: '1px solid #eee',
            }}
          >
            <button
              onClick={() => {
                if (selectedPlace) {
                  setSelectedPlace(null)
                } else {
                  onClose() // SearchBottomSheet로 돌아가기
                }
              }}
              style={{
                width: '24px',
                height: '24px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ←
            </button>
            <div style={{ width: '24px' }}></div>
            <button
              onClick={onClose}
              style={{
                width: '24px',
                height: '24px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* 상세보기 모드 */}
        {selectedPlace ? (
          <PlaceDetail
            place={selectedPlace}
            onBack={() => setSelectedPlace(null)}
            onWriteReview={() => setShowWriteReview(true)}
          />
        ) : (
          <>
            {/* 검색 헤더 */}
            <div
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid #eee',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '4px',
                }}
              >
                "{searchKeyword}" 검색 결과
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {searchResults.length}개의 장소를 찾았습니다
              </div>
            </div>

            {/* 로딩 */}
            {isLoading && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '14px' }}>검색 중입니다...</div>
              </div>
            )}

            {/* 장소 리스트 */}
            {!isLoading && searchResults.length > 0 && (
              <PlaceList places={searchResults} onPlaceSelect={handlePlaceSelect} />
            )}

            {/* 결과 없음 */}
            {!isLoading && searchResults.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999' }}>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>검색 결과가 없습니다</div>
                <div style={{ fontSize: '14px' }}>다른 키워드로 검색해보세요</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 플로팅 버튼 */}
      {viewMode === 'list' && (
        <FloatingButton label="지도보기" icon="🗺️" onClick={() => handleViewModeChange('map')} />
      )}

      {viewMode === 'map' && searchResults.length > 0 && !isLoading && (
        <FloatingButton label="목록보기" icon="📋" onClick={() => handleViewModeChange('list')} />
      )}

      {/* 리뷰 작성 모달 */}
      {showWriteReview && selectedPlace && (
        <WriteReview
          placeName={selectedPlace.name}
          onBack={() => setShowWriteReview(false)}
          onSubmit={(reviewData) => {
            console.log('리뷰 작성:', reviewData)
            setShowWriteReview(false)
          }}
        />
      )}
    </>
  )
}