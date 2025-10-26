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
}

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('전체')
  const [activeFilter, setActiveFilter] = useState<string>('전체')
  const [isWriting, setIsWriting] = useState(false) // 작성 모드 상태

  const locationName = '한화생명 이글스 파크'

  const reviews: Review[] = [
    // 장소리뷰
    {
      id: '1',
      nickname: '야구매니아',
      board: '맛집리뷰',
      timeAgo: '1시간 전',
      content: '한화생명 이글스 파크 근처 새로 생긴 치킨집 다녀왔는데, 바삭하고 양념도 딱 좋네요. 경기 전에 들리면 딱입니다!',
      images: ['https://via.placeholder.com/80x80', 'https://via.placeholder.com/80x80'],
      placeName: '잠실 치킨 맛집',
      reactions: { tip: 18, angry: 0, foodie: 7, agree: 5, like: 12 },
      tab: '장소리뷰',
      category: '맛집'
    },
    {
      id: '2',
      nickname: '카페러버',
      board: '장소리뷰',
      timeAgo: '2시간 전',
      content: '경기장 근처 카페 분위기 좋고 디저트도 맛있습니다. 창가 자리가 인기 많아요!',
      images: ['https://via.placeholder.com/80x80'],
      placeName: '잠실 카페 라떼',
      reactions: { tip: 5, angry: 0, foodie: 3, agree: 2, like: 4 },
      tab: '장소리뷰',
      category: '카페'
    },
    // 지금경기장
    {
      id: '3',
      nickname: '응원짱',
      board: '지금경기장',
      timeAgo: '10분 전',
      content: '오늘 경기장 분위기 미쳤네요! 응원가 따라 부르다 목이 아플 정도예요. 치맥 필수!',
      images: [],
      placeName: '한화생명 이글스 파크',
      reactions: { tip: 3, angry: 0, foodie: 2, agree: 4, like: 8 },
      tab: '지금경기장'
    },
    // 자유게시판
    {
      id: '4',
      nickname: '야구러버',
      board: '자유게시판',
      timeAgo: '30분 전',
      content: '오늘 경기 진짜 재밌었네요! 9회말 반전까지 완벽했어요. 다음 경기 예약 완료!',
      images: [],
      placeName: '잠실구장 근처',
      reactions: { tip: 4, angry: 0, foodie: 1, agree: 3, like: 10 },
      tab: '자유게시판'
    },
    // 인기 게시글
    {
      id: '5',
      nickname: '응원왕',
      board: '장소리뷰',
      timeAgo: '3시간 전',
      content: '오늘 경기장 앞 길거리 음식들이 진짜 맛있어요. 특히 떡볶이랑 치킨 조합 최고!',
      images: ['https://via.placeholder.com/80x80', 'https://via.placeholder.com/80x80', 'https://via.placeholder.com/80x80'],
      placeName: '한화푸드존',
      reactions: { tip: 25, angry: 1, foodie: 15, agree: 20, like: 30 },
      tab: '🔥 인기',
      category: '맛집'
    },
    {
      id: '6',
      nickname: '치맥러버',
      board: '지금경기장',
      timeAgo: '1시간 전',
      content: '경기장 좌석 배치도 좋고, 매점 음식도 빠르게 나와서 편하게 즐겼습니다!',
      images: [],
      placeName: '한화생명 이글스 파크',
      reactions: { tip: 20, angry: 0, foodie: 8, agree: 15, like: 22 },
      tab: '🔥 인기'
    },
    {
      id: '7',
      nickname: '야구소녀',
      board: '자유게시판',
      timeAgo: '2시간 전',
      content: '오늘 경기 중간에 치어리더 공연 너무 예뻤어요! 사진 많이 찍었네요 😄',
      images: ['https://via.placeholder.com/80x80'],
      placeName: '잠실 경기장',
      reactions: { tip: 18, angry: 0, foodie: 3, agree: 10, like: 25 },
      tab: '🔥 인기'
    }
  ]


  const filterOptions: { [key in Tab]?: string[] } = {
    '🔥 인기': ['전체', '장소리뷰', '지금경기장', '자유게시판'],
    장소리뷰: ['전체', '맛집', '카페', '관광', '기타'],
  }

  const filteredReviews = reviews.filter((r) => {
    if (activeTab === '전체') return true
  
    if (activeTab === '장소리뷰') {
      if (r.tab !== '장소리뷰') return false
      if (activeFilter !== '전체') return r.category === activeFilter
      return true
    }
  
    if (activeTab === '🔥 인기') {
      // 인기 게시글만
      if (r.tab !== '🔥 인기') return false
      // 필터 적용
      if (activeFilter === '전체') return true
      return r.category === activeFilter || r.board === activeFilter
    }
  
    // 지금경기장, 자유게시판
    return r.tab === activeTab
  })  

  // 작성 완료 시 리뷰를 처리하는 예시
  const handleSubmitReview = (reviewData: any) => {
    console.log('작성 완료:', reviewData)
    setIsWriting(false)
  }

  if (isWriting) {
    // 작성 모드
    return (
      <WriteReview
        placeName={locationName} 
        onBack={() => setIsWriting(false)}
        onSubmit={handleSubmitReview}
      />
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* 위치 + Write 버튼 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        fontSize: '16px',
        color: '#333'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '4px' }}>📍</span>
          <span style={{ fontWeight: 'bold' }}>{locationName}</span>
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
