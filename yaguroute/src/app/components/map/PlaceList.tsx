import React from 'react'
import { Place } from '@/app/types/map'
import emptyImage from '@/images/map/empty.png'

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
          src={place.imageUrl || emptyImage.src}
          alt={place.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{place.name}</div>
          {/* 카테고리 표시 */}
          {place.category && (
            <div 
              style={{ 
                fontSize: '12px', 
                color: '#FF6B35', 
                border: '1px solid #FF6B35', 
                padding: '2px 6px', 
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              {place.category}
            </div>
          )}
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
  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {places.length > 0 ? (
        places.map((place, index) => (
          <PlaceItem
            key={`${place.latitude},${place.longitude}-${index}`}
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