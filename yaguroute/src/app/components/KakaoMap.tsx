'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import SearchBottomSheet from './SearchBottomSheet';
import iconMarker from '../../images/map/icon-marker.png';
import iconMarkerActive from '../../images/map/icon-marker-active.png';

interface KakaoMapProps {
  width?: string;
  height?: string;
  center?: { lat: number; lng: number };
  level?: number;
  searchKeyword?: string;
  onSearchKeywordChange?: (keyword: string) => void;
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

const KakaoMap = forwardRef<any, KakaoMapProps>(({ 
  width = '100%', 
  height = '400px', 
  center = { lat: 37.5665, lng: 126.9780 }, // 서울시청 기본 좌표
  level = 3,
  searchKeyword = '',
  onSearchKeywordChange
}, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const selectedMarkerRef = useRef<any>(null);
  const selectedInfoWindowRef = useRef<any>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  useImperativeHandle(ref, () => ({
    searchPlaces: (keyword?: string) => {
      const searchTerm = keyword || searchKeyword;
      if (searchTerm.trim()) {
        searchPlaces(searchTerm);
      }
    }
  }));

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
        }
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [center.lat, center.lng, level]);

  // 마커 제거 함수
  const removeMarkers = () => {
    // 검색 결과 마커들 제거
    markers.forEach(marker => {
      marker.setMap(null);
    });
    setMarkers([]);
    
    // 선택된 마커 제거
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
      selectedMarkerRef.current = null;
    }
    
    // 선택된 인포윈도우 제거
    if (selectedInfoWindowRef.current) {
      selectedInfoWindowRef.current.close();
      selectedInfoWindowRef.current = null;
    }
  };

  // 장소 검색 함수
  const searchPlaces = (keyword: string) => {
    if (!map) {
      console.error('지도가 아직 로드되지 않았습니다');
      return;
    }
    
    if (!keyword.trim()) {
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

      // 키워드로 장소 검색
      ps.keywordSearch(keyword, (data: Place[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(data);
          setShowBottomSheet(true);
          setViewMode('map'); // 검색 시 기본적으로 지도 모드
          
          // 검색 결과를 지도에 마커로 표시
          const newMarkers: any[] = [];
          const bounds = new window.kakao.maps.LatLngBounds();

          data.forEach((place, index) => {
            // 마커 생성 (커스텀 아이콘 사용)
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
              title: place.place_name,
              image: new window.kakao.maps.MarkerImage(
                iconMarker.src,
                new window.kakao.maps.Size(28, 28)
              )
            });

            // 마커를 지도에 표시
            marker.setMap(map);
            newMarkers.push(marker);

            // 마커에 클릭 이벤트 추가
            window.kakao.maps.event.addListener(marker, 'click', () => {
              handleMarkerClick(place);
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
          setShowBottomSheet(false);
        }
      });
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  // 바텀시트 닫기
  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    setViewMode('map'); // 바텀시트를 닫을 때 지도 모드로 리셋
  };

  // 뷰 모드 변경 핸들러
  const handleViewModeChange = (mode: 'map' | 'list') => {
    setViewMode(mode);
  };

  // 마커 클릭 핸들러
  const handleMarkerClick = (place: Place) => {
    // 검색창을 클릭된 장소명으로 업데이트
    if (onSearchKeywordChange) {
      onSearchKeywordChange(place.place_name);
    }
    
    // 기존 선택된 마커와 인포윈도우 제거
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
      selectedMarkerRef.current = null;
    }
    if (selectedInfoWindowRef.current) {
      selectedInfoWindowRef.current.close();
      selectedInfoWindowRef.current = null;
    }
    
    const newSelectedMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
      title: place.place_name,
      image: new window.kakao.maps.MarkerImage(
        iconMarkerActive.src,
        new window.kakao.maps.Size(28, 28)
      )
    });
    
    // 선택된 마커를 지도에 표시
    newSelectedMarker.setMap(map);
    selectedMarkerRef.current = newSelectedMarker;
    // 해당 장소로 지도 중심 이동 및 줌 레벨 조정
    const moveLatLon = new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x));
    map.setCenter(moveLatLon);
    map.setLevel(3);
    
    // 인포윈도우 생성 및 표시
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding: 8px; font-size: 13px; min-width: 150px;">
          <div style="font-weight: bold; margin-bottom: 4px; color: #333;">
            ${place.place_name}
          </div>
          <div style="color: #666; font-size: 12px;">
            ${place.road_address_name || place.address_name}
          </div>
        </div>
      `
    });
    infowindow.open(map, newSelectedMarker);
    selectedInfoWindowRef.current = infowindow;
  };

  // 장소 선택 핸들러 (바텀시트에서 선택)
  const handlePlaceSelect = (place: Place) => {
    // 목록보기 모드에서 선택한 경우 지도 모드로 전환
    setViewMode('map');
    
    // 마커 클릭과 동일한 로직 실행
    handleMarkerClick(place);
  };

  return (
    <div style={{ width, height, position: 'relative' }}>

      {/* 검색 결과 바텀시트 */}
      <SearchBottomSheet
        isVisible={showBottomSheet}
        searchResults={searchResults}
        onClose={handleCloseBottomSheet}
        onPlaceSelect={handlePlaceSelect}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

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
});

KakaoMap.displayName = 'KakaoMap';

export default KakaoMap;