'use client'

import { useState } from 'react'

interface ReviewItemProps {
  review: {
    id: string
    nickname: string
    board: string
    timeAgo: string
    content: string
    images?: string[]
    placeName: string
    reactions: {
      tip: number
      angry: number
      foodie: number
      agree: number
      like: number
    }
  }
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)

  const shouldTruncate = review.content.length > 100
  const displayContent = shouldTruncate && !isExpanded 
    ? review.content.substring(0, 100) + '...' 
    : review.content

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* 사용자 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#FF6B35',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '8px',
          fontSize: '16px'
        }}>
          👤
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
            {review.nickname}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {review.board} • {review.timeAgo}
          </div>
        </div>
      </div>

      {/* 이미지들 */}
      {review.images && review.images.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(showAllImages ? review.images : review.images.slice(0, 2)).map((image, index) => (
              <div
                key={index}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#ccc'
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={`리뷰 이미지 ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  '📷'
                )}
              </div>
            ))}
            {review.images.length > 2 && !showAllImages && (
              <button
                onClick={() => setShowAllImages(true)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  backgroundColor: '#f0f0f0',
                  border: '1px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#666'
                }}
              >
                +{review.images.length - 2}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 장소명 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '8px',
        fontSize: '12px',
        color: '#666'
      }}>
        <span style={{ marginRight: '4px' }}>📍</span>
        {review.placeName}
      </div>

      {/* 리뷰 내용 */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ 
          fontSize: '14px', 
          lineHeight: 1.5, 
          color: '#333',
          whiteSpace: 'pre-wrap'
        }}>
          {displayContent}
        </div>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#FF6B35',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '4px 0',
              marginTop: '4px'
            }}
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 반응 버튼들 */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap',
        fontSize: '12px'
      }}>
        <button style={{
          border: 'none',
          background: 'transparent',
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>🍯</span>
          꿀팁감사 {review.reactions.tip.toLocaleString()}
        </button>
        <button style={{
          border: 'none',
          background: 'transparent',
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>😤</span>
          부글부글 {review.reactions.angry.toLocaleString()}
        </button>
        <button style={{
          border: 'none',
          background: 'transparent',
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>🤤</span>
          쩝쩝박사 {review.reactions.foodie.toLocaleString()}
        </button>
        <button style={{
          border: 'none',
          background: 'transparent',
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>👍</span>
          인정 {review.reactions.agree.toLocaleString()}
        </button>
        <button style={{
          border: 'none',
          background: 'transparent',
          color: '#666',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>❤️</span>
          좋아요 {review.reactions.like.toLocaleString()}
        </button>
      </div>
    </div>
  )
}

export default ReviewItem
