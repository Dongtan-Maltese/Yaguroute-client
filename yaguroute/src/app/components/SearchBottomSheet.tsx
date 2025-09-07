'use client';

import React, { useState } from 'react';
import baseballRestaurants from '../../data/baseballRestaurants.json';
import iconPlayerActive from '../../images/map/icon-player-active.png';
import iconPlayer from '../../images/map/icon-player.png';

interface Place {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  category?: string;
  description?: string;
  rating?: number;
  image?: string;
}

interface SearchBottomSheetProps {
  isVisible: boolean;
  searchResults: Place[];
  onClose: () => void;
  onPlaceSelect: (place: Place) => void;
}

export default function SearchBottomSheet({
  isVisible,
  searchResults,
  onClose,
  onPlaceSelect
}: SearchBottomSheetProps) {
  const [activeTab, setActiveTab] = useState<'fan' | 'baseball'>('fan');

  if (!isVisible) {
    return null;
  }

  const currentData = activeTab === 'fan' ? searchResults : baseballRestaurants;
  const hasData = currentData.length > 0;

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'white',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      maxHeight: '60%',
      overflowY: 'auto',
      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease-in-out'
    }}>
      {/* 바텀시트 핸들 */}
      <div style={{
        width: '40px',
        height: '4px',
        backgroundColor: '#ddd',
        borderRadius: '2px',
        margin: '12px auto',
        cursor: 'pointer'
      }} onClick={onClose} />
      
      {/* 탭 헤더 */}
      <div style={{
        display: 'flex',
        padding: '0 20px',
        borderBottom: '1px solid #eee',
        marginBottom: '16px'
      }}>
        <button
          onClick={() => setActiveTab('fan')}
          style={{
            flex: 1,
            padding: '16px 0',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: activeTab === 'fan' ? 'bold' : 'normal',
            color: activeTab === 'fan' ? '#FF6B35' : '#666',
            borderBottom: activeTab === 'fan' ? '2px solid #FF6B35' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <img 
            src={activeTab === 'fan' ? iconPlayerActive.src : iconPlayer.src}
            alt="팬 추천"
            style={{ width: '20px', height: '20px' }}
          />
          팬 추천 BEST
        </button>
        <button
          onClick={() => setActiveTab('baseball')}
          style={{
            flex: 1,
            padding: '16px 0',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: activeTab === 'baseball' ? 'bold' : 'normal',
            color: activeTab === 'baseball' ? '#FF6B35' : '#666',
            borderBottom: activeTab === 'baseball' ? '2px solid #FF6B35' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <img 
            src={activeTab === 'baseball' ? iconPlayerActive.src : iconPlayer.src}
            alt="야구선수 맛집"
            style={{ width: '20px', height: '20px' }}
          />
          야구선수 맛집
        </button>
      </div>
      
      {/* 데이터 목록 */}
      <div style={{ padding: '0 0 20px 0' }}>
        {hasData ? currentData.map((place, index) => (
          <div
            key={index}
            onClick={() => onPlaceSelect(place)}
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #f0f0f0',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '16px' }}>
              {place.place_name}
            </div>
            {place.category && (
              <div style={{ color: '#FF6B35', fontSize: '12px', marginBottom: '2px', fontWeight: 'bold' }}>
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
        )) : (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#666'
          }}>
            {activeTab === 'fan' ? '검색 결과가 없습니다.' : '야구선수 맛집 데이터를 불러오는 중...'}
          </div>
        )}
      </div>
    </div>
  );
}
