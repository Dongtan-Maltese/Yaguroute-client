import React from 'react'
import { Place } from '@/app/types/map'

interface PlaceListProps {
  places: Place[]
  onPlaceSelect: (place: Place) => void
}

const PlaceItem = ({
  place,
  onClick,
}: {
  place: Place
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        padding: '12px 20px',
        borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white'
      }}
    >
      {/* 좌측 이미지 */}
      {place.imageUrl && (
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
            marginRight: '16px',
          }}
        >
          <img
            src={place.imageUrl}
            alt={place.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.parentElement!.style.display = 'none'
            }}
          />
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{place.name}</div>
          {/* TODO. 카테고리 받아와서 표시해주기 */}
          <div style={{ fontSize: '12px', color: '#FF6B35', border: '1px solid #FF6B35', padding: '2px 6px', borderRadius: '4px' }}>
            카테고리
          </div>
        </div>

        {place.description && (
          <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.4 }}>
            {place.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PlaceList({ places, onPlaceSelect }: PlaceListProps) {
  // TODO. 더미 데이터 제거
  const data: Place[] =
    places && places.length > 0
      ? places
      : [
          {
            id: '1',
            name: '맛있는 치킨집',
            latitude: '37.501',
            longitude: '127.039',
            description: '바삭하고 촉촉한 치킨이 인기인 곳',
            imageUrl: 'https://picsum.photos/100/100?random=1',
          },
          {
            id: '2',
            name: '분위기 좋은 카페',
            latitude: '37.502',
            longitude: '127.037',
            description: '커피와 디저트가 맛있는 힙한 카페',
            imageUrl: 'https://picsum.photos/100/100?random=2',
          },
          {
            id: '3',
            name: '핫플레이스 맛집',
            latitude: '37.564',
            longitude: '126.903',
            description: 'SNS에서 유명한 인기 맛집',
            imageUrl: 'https://picsum.photos/100/100?random=3',
          },
        ]

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {data.length > 0 ? (
        data.map((place) => (
          <PlaceItem
            key={place.id}
            place={place}
            onClick={() => onPlaceSelect(place)}
          />
        ))
      ) : (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#666',
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )
}
