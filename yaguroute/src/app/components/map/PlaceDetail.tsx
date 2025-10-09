import { Place } from "@/app/types/map";

const PlaceDetail = ({ place, onBack }: { place: Place; onBack: () => void }) => (
    <div style={{ padding: '0 20px 20px 20px' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '12px',
          border: 'none',
          background: 'transparent',
          color: '#FF6B35',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ← 목록으로 돌아가기
      </button>
  
      <div style={{ display: 'flex', gap: '16px' }}>
        {place.imageUrl && (
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={place.imageUrl}
              alt={place.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>{place.name}</div>
            <div
              style={{
                fontSize: '12px',
                color: '#FF6B35',
                border: '1px solid #FF6B35',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              카테고리
            </div>
          </div>
          {place.description && (
            <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.4 }}>{place.description}</div>
          )}
        </div>
      </div>
    </div>
  )

  export default PlaceDetail