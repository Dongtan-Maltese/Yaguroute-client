'use client';

import { useEffect, useRef, useState } from 'react';

interface KakaoMapProps {
  width?: string;
  height?: string;
  center?: { lat: number; lng: number };
  level?: number;
}

interface Place {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAOMAP_APPKEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

export default function KakaoMap({ 
  width = '100%', 
  height = '400px', 
  center = { lat: 37.5665, lng: 126.9780 }, // 서울시청 기본 좌표
  level = 3 
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_APPKEY}&libraries=services&autoload=false`;

    const existingScript = document.querySelector(`script[src="${mapScriptSrc}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = mapScriptSrc;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;

        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: level,
            zoomControl: true
          };

           const mapInstance = new window.kakao.maps.Map(container, options);
           setMap(mapInstance);

           // 클릭 이벤트 추가
           window.kakao.maps.event.addListener(mapInstance, 'click', function(mouseEvent: any) {
             const latlng = mouseEvent.latLng;
             console.log('클릭한 위치:', latlng.getLat(), latlng.getLng());
           });
        }
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [center.lat, center.lng, level]);

  // 마커 제거 함수
  const removeMarkers = () => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  // 장소 검색 함수
  const searchPlaces = () => {
    if (!map) {
      console.error('지도가 아직 로드되지 않았습니다');
      return;
    }
    
    if (!searchKeyword.trim()) {
      console.error('검색어가 비어있습니다');
      return;
    }

    // 기존 마커 제거
    removeMarkers();

    // Places API가 로드되었는지 확인
    if (!window.kakao.maps.services) {
      console.error('Places API가 로드되지 않았습니다');
      return;
    }

    try {
      // 장소 검색 서비스 객체 생성
      const ps = new window.kakao.maps.services.Places();
      console.log('Places 서비스 객체 생성 완료');

      // 키워드로 장소 검색
      ps.keywordSearch(searchKeyword, (data: Place[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(data);
          
          // 검색 결과를 지도에 마커로 표시
          const newMarkers: any[] = [];
          const bounds = new window.kakao.maps.LatLngBounds();

          data.forEach((place, index) => {
            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
              title: place.place_name
            });

            // 마커를 지도에 표시
            marker.setMap(map);
            newMarkers.push(marker);

            // 마커에 클릭 이벤트 추가
            window.kakao.maps.event.addListener(marker, 'click', () => {
              // 인포윈도우 생성
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `
                  <div style="padding: 5px; font-size: 12px;">
                    <strong>${place.place_name}</strong><br>
                    ${place.road_address_name || place.address_name}
                  </div>
                `
              });
              infowindow.open(map, marker);
            });

            // 지도 범위에 포함시키기
            bounds.extend(new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)));
          });

          setMarkers(newMarkers);

          // 검색 결과가 있으면 지도 범위를 조정
          if (data.length > 0) {
            map.setBounds(bounds);
          }
        } else {
          console.error('검색 실패:', status);
          setSearchResults([]);
        }
      });
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  // 엔터키로 검색
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchPlaces();
    }
  };

  return (
    <div style={{ width, height, position: 'relative' }}>
      {/* 검색창 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="장소를 검색하세요"
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            width: '200px'
          }}
        />
        <button
          onClick={searchPlaces}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          검색
        </button>
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '10px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {searchResults.map((place, index) => (
            <div
              key={index}
              onClick={() => {
                // 검색창을 선택된 장소명으로 업데이트
                setSearchKeyword(place.place_name);
                
                // 검색 결과 목록 닫기
                setSearchResults([]);
                
                // 기존 마커 제거
                removeMarkers();
                
                // 선택된 장소에 마커 생성
                const selectedMarker = new window.kakao.maps.Marker({
                  position: new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
                  title: place.place_name
                });
                
                // 마커를 지도에 표시
                selectedMarker.setMap(map);
                setMarkers([selectedMarker]);
                
                // 해당 장소로 지도 중심 이동 및 줌 레벨 조정
                const moveLatLon = new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x));
                map.setCenter(moveLatLon);
                map.setLevel(3);
                
                // 인포윈도우 표시
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `
                    <div style="padding: 5px; font-size: 12px;">
                      <strong>${place.place_name}</strong><br>
                      ${place.road_address_name || place.address_name}
                    </div>
                  `
                });
                infowindow.open(map, selectedMarker);
              }}
              style={{
                padding: '12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {place.place_name}
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}>
                {place.road_address_name || place.address_name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 지도 컨테이너 */}
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%'
        }} 
      />
    </div>
  );
}
