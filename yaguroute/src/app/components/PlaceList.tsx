import React from 'react'

interface Place {
  place_name: string
  address_name: string
  road_address_name: string
  x: string
  y: string
  category?: string
  description?: string
  rating?: number
  image?: string
  team?: string
}

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
      <div
        style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '16px' }}
      >
        {place.place_name}
      </div>
      {place.category && (
        <div
          style={{
            color: '#FF6B35',
            fontSize: '12px',
            marginBottom: '2px',
            fontWeight: 'bold',
          }}
        >
          {place.category}
        </div>
      )}
      {place.description && (
        <div style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>
          {place.description}
        </div>
      )}
      <div style={{ color: '#666', fontSize: '13px' }}>
        {place.road_address_name || place.address_name}
      </div>
      {place.rating && (
        <div style={{ color: '#FF6B35', fontSize: '12px', marginTop: '4px' }}>
          ⭐ {place.rating}
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
        places.map((place, index) => (
          <PlaceItem
            key={index}
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
          '검색 결과가 없습니다.'
        </div>
      )}
    </div>
  )
}
