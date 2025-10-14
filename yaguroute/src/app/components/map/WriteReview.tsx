'use client'

import { useState } from 'react'

interface WriteReviewProps {
  placeName: string
  onBack: () => void
  onSubmit?: (reviewData: ReviewData) => void
}

interface ReviewData {
  category: string
  content: string
  photos: File[]
}

const WriteReview = ({ placeName, onBack, onSubmit }: WriteReviewProps) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [content, setContent] = useState('')
  const [photos, setPhotos] = useState<File[]>([])

  const categories = ['맛집', '카페', '관광', '기타']

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (photos.length + files.length <= 2) {
      setPhotos([...photos, ...files])
    }
  }

  const handleSubmit = () => {
    if (selectedCategory && content.length >= 10) {
      const reviewData: ReviewData = {
        category: selectedCategory,
        content,
        photos
      }
      onSubmit?.(reviewData)
    }
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'white', 
      zIndex: 2000,
      overflowY: 'auto'
    }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 1
      }}>
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '18px',
            marginRight: '16px'
          }}
        >
          ←
        </button>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          margin: 0, 
          flex: 1,
          textAlign: 'center',
          marginRight: '34px' // 뒤로가기 버튼과 균형 맞추기
        }}>
          리뷰 남기기
        </h1>
      </div>

      <div style={{ padding: '20px' }}>
        {/* 장소 카테고리 */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>
            장소 카테고리
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedCategory === category ? '1px solid #FF6B35' : '1px solid #ddd',
                  backgroundColor: selectedCategory === category ? '#FFF3EE' : 'white',
                  color: selectedCategory === category ? '#FF6B35' : '#555',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 게시물 작성 */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>
            게시물 작성
          </h2>
          
          {/* 장소명 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '14px', color: '#333' }}>{placeName}</span>
            <span style={{ color: '#666', fontSize: '14px' }}>→</span>
          </div>

          {/* 사진 추가 */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', color: '#333', marginBottom: '8px' }}>
              사진 추가 {photos.length}/2
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 1].map((index) => (
                <div
                  key={index}
                  style={{
                    width: '80px',
                    height: '80px',
                    border: '1px dashed #ddd',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {photos[index] ? (
                    <img
                      src={URL.createObjectURL(photos[index])}
                      alt={`사진 ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <span style={{ fontSize: '24px', color: '#ccc' }}>📷</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 텍스트 입력 */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="나누고 싶은 이야기를 작성해주세요 (최소 10자)"
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <div style={{ 
              textAlign: 'right', 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '4px' 
            }}>
              {content.length}/400
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        backgroundColor: 'white',
        borderTop: '1px solid #eee'
      }}>
        <button
          onClick={handleSubmit}
          disabled={!selectedCategory || content.length < 10}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: selectedCategory && content.length >= 10 ? '#FF6B35' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: selectedCategory && content.length >= 10 ? 'pointer' : 'not-allowed'
          }}
        >
          게시하기
        </button>
      </div>
    </div>
  )
}

export default WriteReview
