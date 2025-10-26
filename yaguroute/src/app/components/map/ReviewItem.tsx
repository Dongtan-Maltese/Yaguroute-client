'use client'

import { useState, useEffect } from 'react'

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

type ReactionType = keyof ReviewItemProps['review']['reactions']

const reactionInfo: Record<ReactionType, { emoji: string; label: string }> = {
  tip: { emoji: '🍯', label: '꿀팁감사' },
  angry: { emoji: '😤', label: '부글부글' },
  foodie: { emoji: '🤤', label: '쩝쩝박사' },
  agree: { emoji: '👍', label: '인정' },
  like: { emoji: '❤️', label: '좋아요' }
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // 클릭 상태 + 카운트 상태
  const [clickedReactions, setClickedReactions] = useState<{ [key in ReactionType]?: boolean }>({})
  const [reactionCounts, setReactionCounts] = useState({ ...review.reactions })

  // 마운트 시 sessionStorage에서 상태 불러오기
  useEffect(() => {
    const saved = sessionStorage.getItem(`reactions_${review.id}`)
    if (saved) {
      const parsed = JSON.parse(saved)
      setClickedReactions(parsed.clicked || {})
      setReactionCounts(parsed.counts || { ...review.reactions })
    }
  }, [review.id])

  const handleReactionClick = (type: ReactionType) => {
    if (clickedReactions[type]) return
    const newClicked = { ...clickedReactions, [type]: true }
    const newCounts = { ...reactionCounts, [type]: reactionCounts[type] + 1 }
    setClickedReactions(newClicked)
    setReactionCounts(newCounts)

    // sessionStorage에 저장
    sessionStorage.setItem(`reactions_${review.id}`, JSON.stringify({ clicked: newClicked, counts: newCounts }))
  }

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

      {/* 리뷰 내용 */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', lineHeight: 1.5, color: '#333', whiteSpace: 'pre-wrap' }}>
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
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {(Object.keys(reactionInfo) as ReactionType[]).map((type) => {
          const clicked = clickedReactions[type]
          return (
            <button
              key={type}
              onClick={() => handleReactionClick(type)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: clicked ? '1px solid #FF6B35' : '1px solid #ccc',
                borderRadius: '12px',
                padding: '4px 8px',
                backgroundColor: clicked ? '#FFF3EE' : '#f0f0f0',
                cursor: clicked ? 'default' : 'pointer',
                fontSize: '12px',
                color: clicked ? '#FF6B35' : '#666'
              }}
            >
              <span>{reactionInfo[type].emoji}</span>
              <span>{reactionInfo[type].label} {reactionCounts[type]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewItem
