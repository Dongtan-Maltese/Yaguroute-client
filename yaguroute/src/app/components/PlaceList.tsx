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
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white'
      }}
    >
      {/* 이미지가 있으면 표시 */}
      {place.imageUrl && (
        <div
          style={{
            width: '100%',
            height: '120px',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '12px',
          }}
        >
          <img
            src={place.imageUrl}
            alt={place.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              // 이미지 로드 실패 시 숨기기
              e.currentTarget.parentElement!.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* 장소명 */}
      <div
        style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px', color: '#333' }}
      >
        {place.name}
      </div>

      {/* 설명 */}
      {place.description && (
        <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.4' }}>
          {place.description}
        </div>
      )}
    </div>
  )
}

export default function PlaceList({ places, onPlaceSelect }: PlaceListProps) {
  const hasData = places.length > 0

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {hasData ? (
        places.map((place) => (
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