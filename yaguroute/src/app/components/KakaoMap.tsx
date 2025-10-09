'use client'

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import SearchBottomSheet from './SearchBottomSheet'
import iconMarker from '../../images/map/icon-marker.png'
import iconMarkerActive from '../../images/map/icon-marker-active.png'
import { Place } from '@/app/types/map'

interface KakaoMapProps {
  width?: string
  height?: string
  center?: { lat: number; lng: number }
  level?: number
  searchKeyword?: string
  onSearchKeywordChange?: (keyword: string) => void
}

interface SearchResponse {
  items: Place[]
}

declare global {
  interface Window {
    kakao: any
  }
}

const KAKAOMAP_APPKEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY

const KakaoMap = forwardRef<any, KakaoMapProps>(
  (
    {
      width = '100%',
      height = '400px',
      center = { lat: 37.5665, lng: 126.978 },
      level = 3,
      searchKeyword = '',
      onSearchKeywordChange,
    },
    ref
  ) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<any>(null)
    const [searchResults, setSearchResults] = useState<Place[]>([])
    const [markers, setMarkers] = useState<any[]>([])
    const selectedMarkerRef = useRef<any>(null)
    const selectedInfoWindowRef = useRef<any>(null)
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
    const [isLoading, setIsLoading] = useState(false)
    const [currentKeyword, setCurrentKeyword] = useState('')
    const [currentLocation, setCurrentLocation] = useState(center)

    useImperativeHandle(ref, () => ({
      searchPlaces: (keyword?: string) => {
        const searchTerm = keyword || searchKeyword
        if (searchTerm.trim()) {
          searchPlaces(searchTerm)
        }
      },
    }))

    useEffect(() => {
      const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_APPKEY}&libraries=services&autoload=false`

      const existingScript = document.querySelector(
        `script[src="${mapScriptSrc}"]`
      )
      if (existingScript) {
        existingScript.remove()
      }

      const mapScript = document.createElement('script')
      mapScript.async = true
      mapScript.src = mapScriptSrc

      document.head.appendChild(mapScript)

      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          const container = mapRef.current

          if (container) {
            const options = {
              center: new window.kakao.maps.LatLng(center.lat, center.lng),
              level: level,
              zoomControl: true,
            }

            const mapInstance = new window.kakao.maps.Map(container, options)
            setMap(mapInstance)
          }
        })
      }

      mapScript.addEventListener('load', onLoadKakaoMap)

      return () => mapScript.removeEventListener('load', onLoadKakaoMap)
    }, [center.lat, center.lng, level])

    const removeMarkers = () => {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
      setMarkers([])

      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null)
        selectedMarkerRef.current = null
      }

      if (selectedInfoWindowRef.current) {
        selectedInfoWindowRef.current.close()
        selectedInfoWindowRef.current = null
      }
    }

    const searchPlaces = async (keyword: string, teamCode?: string) => {
      if (!map) {
        console.error('지도가 아직 로드되지 않았습니다')
        return
      }
    
      if (!keyword.trim()) {
        console.error('검색어가 비어있습니다')
        return
      }
    
      removeMarkers()
      setIsLoading(true)
    
      try {
        const mapCenter = map.getCenter()
        const currentLat = mapCenter.getLat()
        const currentLng = mapCenter.getLng()
    
        setCurrentKeyword(keyword)
        setCurrentLocation({ lat: currentLat, lng: currentLng })
    
        const params = new URLSearchParams({
          keyword: keyword,
          latitude: currentLat.toString(),
          longitude: currentLng.toString(),
        })
    
        if (teamCode) params.append('team', teamCode)
    
        // 🔹 1️⃣  먼저 백엔드 검색 시도
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?${params.toString()}`
        const response = await fetch(apiUrl)
    
        if (!response.ok) {
          throw new Error(`백엔드 API 요청 실패: ${response.status}`)
        }
    
        const data: SearchResponse = await response.json()
    
        let results = data.items ?? []
    
        // 🔹 2️⃣  백엔드 결과가 없으면 카카오맵 fallback 검색
        if (results.length === 0) {
          console.log('백엔드 검색 결과 없음 → 카카오맵 검색 시도')
    
          const kakaoPlaces = new window.kakao.maps.services.Places()
          const kakaoResults: Place[] = await new Promise((resolve) => {
            kakaoPlaces.keywordSearch(keyword, (data: any[], status: string) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const places: Place[] = data.map((item) => ({
                  name: item.place_name,
                  latitude: item.y,
                  longitude: item.x,
                  id: item.id,
                  description: item.address_name,
                  imageUrl: '', // 카카오는 이미지가 없으니 비워둠
                }))
                resolve(places)
              } else {
                resolve([])
              }
            })
          })
    
          results = kakaoResults
        }
    
        if (results.length > 0) {
          setSearchResults(results)
          setShowBottomSheet(true)
          setViewMode('map')
    
          const newMarkers: any[] = []
          const bounds = new window.kakao.maps.LatLngBounds()
    
          results.forEach((place) => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                parseFloat(place.latitude),
                parseFloat(place.longitude)
              ),
              title: place.name,
              image: new window.kakao.maps.MarkerImage(
                iconMarker.src,
                new window.kakao.maps.Size(28, 28)
              ),
            })
    
            marker.setMap(map)
            newMarkers.push(marker)
    
            window.kakao.maps.event.addListener(marker, 'click', () => {
              handleMarkerClick(place)
            })
    
            bounds.extend(
              new window.kakao.maps.LatLng(
                parseFloat(place.latitude),
                parseFloat(place.longitude)
              )
            )
          })
    
          setMarkers(newMarkers)
          map.setBounds(bounds)
        } else {
          setSearchResults([])
          setShowBottomSheet(false)
          alert('검색 결과가 없습니다.')
        }
      } catch (error) {
        console.error('검색 중 오류 발생:', error)
        alert('검색 중 오류가 발생했습니다. 다시 시도해주세요.')
      } finally {
        setIsLoading(false)
      }
    }    

    const handleCloseBottomSheet = () => {
      setShowBottomSheet(false)
      setViewMode('map')
    }

    const handleViewModeChange = (mode: 'map' | 'list') => {
      setViewMode(mode)
    }

    const handleMarkerClick = (place: Place) => {
      if (onSearchKeywordChange) {
        onSearchKeywordChange(place.name)
      }

      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null)
        selectedMarkerRef.current = null
      }
      if (selectedInfoWindowRef.current) {
        selectedInfoWindowRef.current.close()
        selectedInfoWindowRef.current = null
      }

      const newSelectedMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          parseFloat(place.latitude),
          parseFloat(place.longitude)
        ),
        title: place.name,
        image: new window.kakao.maps.MarkerImage(
          iconMarkerActive.src,
          new window.kakao.maps.Size(28, 28)
        ),
      })

      newSelectedMarker.setMap(map)
      selectedMarkerRef.current = newSelectedMarker

      const moveLatLon = new window.kakao.maps.LatLng(
        parseFloat(place.latitude),
        parseFloat(place.longitude)
      )
      map.setCenter(moveLatLon)
      map.setLevel(3)

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
        <div style="padding: 8px; font-size: 13px; min-width: 150px;">
          <div style="font-weight: bold; margin-bottom: 4px; color: #333;">
            ${place.name}
          </div>
          <div style="color: #666; font-size: 12px;">
            ${place.description || ''}
          </div>
        </div>
      `,
      })
      infowindow.open(map, newSelectedMarker)
      selectedInfoWindowRef.current = infowindow
    }

    const handlePlaceSelect = (place: Place) => {
      setViewMode('map')
      handleMarkerClick(place)
    }

    const handleTeamSearchRequest = (teamCode: string) => {
      if (currentKeyword.trim()) {
        searchPlaces(currentKeyword, teamCode)
      }
    }

    return (
      <div style={{ width, height, position: 'relative' }}>
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2000,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                검색 중...
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                장소를 찾고 있습니다
              </div>
            </div>
          </div>
        )}

        <SearchBottomSheet
          isVisible={showBottomSheet}
          searchResults={searchResults}
          onClose={handleCloseBottomSheet}
          onPlaceSelect={handlePlaceSelect}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          currentKeyword={currentKeyword}
          currentLocation={currentLocation}
          onTeamSearchRequest={handleTeamSearchRequest}
        />

        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    )
  }
)

KakaoMap.displayName = 'KakaoMap'

export default KakaoMap