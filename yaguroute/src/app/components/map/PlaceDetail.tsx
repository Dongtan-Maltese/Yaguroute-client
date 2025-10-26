import { Place } from "@/app/types/map";
import emptyImage from "@/images/map/empty.png"
import { useState } from "react";
import ReviewItem from "./ReviewItem";

interface PlaceDetailProps {
  place: Place;
  onBack: () => void;
  onWriteReview?: () => void;
}

const PlaceDetail = ({ place, onBack, onWriteReview }: PlaceDetailProps) => {
  const [activeTab, setActiveTab] = useState<'review' | 'enjoy'>('review');
  
  // 임시 리뷰 데이터 (실제로는 API에서 가져올 데이터)
  // 리뷰가 있는 경우를 보려면 아래 배열의 주석을 해제하세요
  // const [reviews] = useState<any[]>([]);
  
  // 리뷰가 있는 경우 샘플 데이터 (테스트용)
  const [reviews] = useState([
    {
      id: '1',
      nickname: '닉네임',
      board: '자유게시판',
      timeAgo: '3분 전',
      content: '세 줄을 초과하는 긴 텍스트는 더보기를 클릭해 전체 내용을 확인해요. 세 줄을 초과하는 긴 텍스트는 더보기를 클릭해 전체 내용을 확인해요 세 줄을 초과하는 긴 텍스트는 더보기를 클릭해 전체 내용을 확인해요. 정말 맛있었어요!',
      images: [
        'https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=야구',
        'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=게임'
      ],
      placeName: place.name,
      reactions: {
        tip: 1234545,
        angry: 12323,
        foodie: 212,
        agree: 1,
        like: 43
      }
    },
    {
      id: '2',
      nickname: '야구팬123',
      board: '맛집리뷰',
      timeAgo: '1시간 전',
      content: '경기장 근처에서 가장 맛있는 쪽갈비집이에요!',
      images: [],
      placeName: place.name,
      reactions: {
        tip: 15,
        angry: 0,
        foodie: 8,
        agree: 3,
        like: 12
      }
    }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
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
            src={place.imageUrl || emptyImage.src}
            alt={place.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
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
              {place.category}
            </div>
          </div>
          {place.description && (
            <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.4 }}>{place.description}</div>
          )}
        </div>
      </div>

      {/* 탭 헤더 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveTab('review')}
          style={{
            flex: 1,
            padding: '12px 0',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: activeTab === 'review' ? 'bold' : 'normal',
            color: activeTab === 'review' ? '#FF6B35' : '#666',
            borderBottom: activeTab === 'review' ? '2px solid #FF6B35' : '2px solid transparent',
            cursor: 'pointer',
          }}
        >
          리뷰
        </button>
        <button
          onClick={() => setActiveTab('enjoy')}
          style={{
            flex: 1,
            padding: '12px 0',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: activeTab === 'enjoy' ? 'bold' : 'normal',
            color: activeTab === 'enjoy' ? '#FF6B35' : '#666',
            borderBottom: activeTab === 'enjoy' ? '2px solid #FF6B35' : '2px solid transparent',
            cursor: 'pointer',
          }}
        >
          즐길거리
        </button>
      </div>

      {/* 탭 내용 */}
      {activeTab === 'review' && (
        <div>
          {reviews.length === 0 ? (
            // 리뷰가 없을 때
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                첫 리뷰 남기기
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                이 세계에서 내가 첫 리뷰 주인공?
              </div>
              <button
                onClick={onWriteReview}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  margin: '0 auto',
                }}
              >
                ✏️
              </button>
            </div>
          ) : (
            // 리뷰가 있을 때
            <div>
              <button
                onClick={onWriteReview}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                리뷰 남기기
                <span>→</span>
              </button>
              {/* 리뷰 목록 */}
              <div>
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'enjoy' && (
        <div>
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            즐길거리 정보가 여기에 표시됩니다.
          </div>
        </div>
      )}
    </div>
  )
}

  export default PlaceDetail