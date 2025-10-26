'use client'

import { useState } from 'react'
import FloatingNav from '../components/common/FloatingNav'
import ReviewItem from '../components/map/ReviewItem'
import writeButton from '@/images/community/write_btn.png'
import WriteReview from '../components/map/WriteReview'

type Tab = '전체' | '🔥 인기' | '장소리뷰' | '지금경기장' | '자유게시판'

interface Review {
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
  tab: Tab
  category?: string
  location: '한화생명 볼파크' | '잠실 야구장'
}

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('전체')
  const [activeFilter, setActiveFilter] = useState<string>('전체')
  const [isWriting, setIsWriting] = useState(false) // 작성 모드 상태
  const [selectedLocation, setSelectedLocation] = useState<'한화생명 볼파크' | '잠실 야구장'>('한화생명 볼파크')
  const reviews: Review[] = [
    // 한화생명 볼파크
    {
      id: '1',
      nickname: '한화가을야구가자',
      board: '장소리뷰',
      timeAgo: '3시간 전',
      content: '오늘 경기장 앞 길거리 음식들이 진짜 맛있어요. 특히 떡볶이랑 치킨 조합 최고!',
      images: [],
      placeName: '한화푸드존',
      reactions: { tip: 25, angry: 1, foodie: 15, agree: 20, like: 30 },
      tab: '🔥 인기',
      category: '맛집',
      location: '한화생명 볼파크'
    },
    {
      id: '2',
      nickname: '치맥러버',
      board: '지금경기장',
      timeAgo: '1시간 전',
      content: '경기장 좌석 배치도 좋고, 매점 음식도 빠르게 나와서 편하게 즐겼습니다!',
      images: [],
      placeName: '한화생명 볼파크',
      reactions: { tip: 20, angry: 0, foodie: 8, agree: 15, like: 22 },
      tab: '지금경기장',
      location: '한화생명 볼파크'
    },
    {
      id: '3',
      nickname: '야구소녀',
      board: '자유게시판',
      timeAgo: '2시간 전',
      content: '오늘 경기 중간에 치어리더 공연 너무 예뻤어요! 사진 많이 찍었네요 😄',
      images: [],
      placeName: '한화생명 볼파크 주변',
      reactions: { tip: 18, angry: 0, foodie: 3, agree: 10, like: 25 },
      tab: '자유게시판',
      location: '한화생명 볼파크'
    },
    {
      id: '4',
      nickname: '야구매니아',
      board: '장소리뷰',
      timeAgo: '50분 전',
      content: '주차 공간 넉넉하고, 경기장 주변 풍경이 좋아요!',
      images: [],
      placeName: '한화생명 볼파크 주변',
      reactions: { tip: 8, angry: 0, foodie: 1, agree: 5, like: 12 },
      tab: '장소리뷰',
      category: '기타',
      location: '한화생명 볼파크'
    },
    {
      id: '5',
      nickname: '치어리더팬',
      board: '🔥 인기',
      timeAgo: '2시간 전',
      content: '오늘 응원석 완전 신났어요! 치맥과 함께 즐기기 딱!',
      images: [],
      placeName: '한화생명 볼파크',
      reactions: { tip: 15, angry: 0, foodie: 5, agree: 10, like: 18 },
      tab: '🔥 인기',
      location: '한화생명 볼파크'
    },
  
    // 잠실 야구장
    {
      id: '6',
      nickname: '잠실구장죽돌이',
      board: '장소리뷰',
      timeAgo: '45분 전',
      content: '잠실구장 근처 떡볶이 맛집 방문! 경기 전 간단히 먹기 딱 좋아요.',
      images: [],
      placeName: '잠실 떡볶이집',
      reactions: { tip: 10, angry: 0, foodie: 5, agree: 3, like: 8 },
      tab: '장소리뷰',
      category: '맛집',
      location: '잠실 야구장'
    },
    {
      id: '7',
      nickname: '무적LG영원해',
      board: '지금경기장',
      timeAgo: '5분 전',
      content: 'LG vs 한화 경기장 분위기 최고네요! 응원 열기 장난 아니에요!',
      images: [],
      placeName: '잠실 야구장',
      reactions: { tip: 4, angry: 0, foodie: 1, agree: 2, like: 5 },
      tab: '지금경기장',
      location: '잠실 야구장'
    },
    {
      id: '8',
      nickname: 'LGLGLGLGL',
      board: '자유게시판',
      timeAgo: '1시간 전',
      content: '오늘 경기 완전 대박! 8회말 역전 드라마네요.',
      images: [],
      placeName: '잠실 야구장 주변',
      reactions: { tip: 6, angry: 0, foodie: 2, agree: 4, like: 12 },
      tab: '자유게시판',
      location: '잠실 야구장'
    },
    {
      id: '9',
      nickname: '응원짱',
      board: '장소리뷰',
      timeAgo: '30분 전',
      content: '경기장 주변 카페 분위기 좋아요! 경기 전 커피 한잔 추천합니다.',
      images: [],
      placeName: '잠실 카페 라떼',
      reactions: { tip: 3, angry: 0, foodie: 2, agree: 2, like: 5 },
      tab: '장소리뷰',
      category: '카페',
      location: '잠실 야구장'
    },
    {
      id: '10',
      nickname: 'LG열혈팬',
      board: '🔥 인기',
      timeAgo: '1시간 전',
      content: '오늘 경기 응원 열기 대박! 치어리더 공연 최고!',
      images: [],
      placeName: '잠실 야구장',
      reactions: { tip: 12, angry: 0, foodie: 3, agree: 8, like: 20 },
      tab: '🔥 인기',
      location: '잠실 야구장'
    }
  ]
  

  const filterOptions: { [key in Tab]?: string[] } = {
    '🔥 인기': ['전체', '장소리뷰', '지금경기장', '자유게시판'],
    장소리뷰: ['전체', '맛집', '카페', '관광', '기타'],
  }

  const filteredReviews = reviews.filter((r) => {
    if (r.location !== selectedLocation && r.tab !== '🔥 인기') return false // 인기 탭은 전체 인기글 유지

    if (activeTab === '전체') return true

    if (activeTab === '장소리뷰') {
      if (r.tab !== '장소리뷰') return false
      if (activeFilter !== '전체') return r.category === activeFilter
      return true
    }

    if (activeTab === '🔥 인기') {
      if (r.tab !== '🔥 인기') return false
      if (activeFilter === '전체') return true
      return r.category === activeFilter || r.board === activeFilter
    }

    return r.tab === activeTab
  })

  const handleSubmitReview = (reviewData: any) => {
    console.log('작성 완료:', reviewData)
    setIsWriting(false)
  }

  if (isWriting) {
    return (
      <WriteReview
        placeName={selectedLocation}
        onBack={() => setIsWriting(false)}
        onSubmit={handleSubmitReview}
      />
    )
  }

  return (
    <div style={{ maxWidth: '600px', height: '100vh', margin: '0 auto', backgroundColor: '#f9f7f5'}}>
      {/* 위치 선택 + Write 버튼 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', fontSize: '16px', color: '#333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📍</span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value as '한화생명 볼파크' | '잠실 야구장')}
            style={{ fontSize: '16px', fontWeight: 'bold', padding: '4px 8px' }}
          >
            <option value="한화생명 볼파크">한화생명 볼파크</option>
            <option value="잠실 야구장">잠실 야구장</option>
          </select>
        </div>
        <button onClick={() => setIsWriting(true)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
          <img src={writeButton.src} alt="Write" style={{ width: '32px', height: '32px' }} />
        </button>
      </div>

      {/* 탭 UI */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '16px' }}>
        {(['전체', '🔥 인기', '장소리뷰', '지금경기장', '자유게시판'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setActiveFilter('전체') }}
            style={{
              flex: 1,
              padding: '12px 0',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid black' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === tab ? '#000' : '#888',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* 필터칩 */}
        {filterOptions[activeTab] && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto' }}>
            {filterOptions[activeTab]!.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  flexShrink: 0,
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #666',
                  backgroundColor: activeFilter === filter ? '#666' : 'white',
                  color: activeFilter === filter ? 'white' : '#666',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* 리뷰 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredReviews.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>리뷰가 없습니다.</div>
          ) : (
            filteredReviews.map((review) => <ReviewItem key={review.id} review={review} />)
          )}
        </div>
      </div>

      <FloatingNav />
    </div>
  )
}

export default CommunityPage
