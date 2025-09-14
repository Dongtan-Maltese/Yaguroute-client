'use client';

import React, { useState } from 'react';
import { baseballRestaurants } from '../../data/baseballRestaurants';
import iconPlayerActive from '../../images/map/icon-player-active.png';
import iconPlayer from '../../images/map/icon-player.png';
import TeamSelector from './TeamSelector';
import PlaceList from './PlaceList';

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
  team?: string;
}

interface SearchBottomSheetProps {
  isVisible: boolean;
  searchResults: Place[];
  onClose: () => void;
  onPlaceSelect: (place: Place) => void;
}

interface BaseballTeam {
  name: string;
  code: string;
  logo: string;
  color: string;
}

// 프로야구 구단 데이터
const baseballTeams: BaseballTeam[] = [
  { name: '한화 이글스', code: 'hanwha', logo: 'Eagles', color: '#FC4E00' },
  { name: 'LG 트윈스', code: 'lg', logo: 'Twins', color: '#C30452' },
  { name: '키움 히어로즈', code: 'kiwoom', logo: 'Heroes', color: '#6E1A29' },
  { name: 'SSG 랜더스', code: 'ssg', logo: 'Landers', color: '#CE0E2D' },
  { name: 'KT 위즈', code: 'kt', logo: 'wiz', color: '#3E3E3E' },
  { name: '삼성 라이온즈', code: 'samsung', logo: 'Lions', color: '#074CA1' },
  { name: '롯데 자이언츠', code: 'lotte', logo: 'Giants', color: '#00357E' },
  { name: 'NC 다이노스', code: 'nc', logo: 'Dinos', color: '#315288' },
  { name: 'KIA 타이거즈', code: 'kia', logo: 'Tigers', color: '#EA0029' },
  { name: '두산 베어스', code: 'doosan', logo: 'Bears', color: '#383284' }
];

export default function SearchBottomSheet({
  isVisible,
  searchResults,
  onClose,
  onPlaceSelect
}: SearchBottomSheetProps) {
  const [activeTab, setActiveTab] = useState<'fan' | 'baseball'>('fan');
  const [selectedTeam, setSelectedTeam] = useState<BaseballTeam>(baseballTeams[0]); // 기본값: 한화 이글스
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  if (!isVisible) {
    return null;
  }

  const filteredRestaurants = baseballRestaurants.filter(restaurant => 
    restaurant.team === selectedTeam.code
  );
  
  const currentData = activeTab === 'fan' ? searchResults : filteredRestaurants;
  const hasData = currentData.length > 0;

  const handleTeamSelect = (team: BaseballTeam) => {
    setSelectedTeam(team);
    setShowTeamSelector(false);
  };

  const handleCloseTeamSelector = () => {
    setShowTeamSelector(false);
  };

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

      {/* 구단 선택 (야구선수 맛집 탭에서만 표시) */}
      {activeTab === 'baseball' && (
        <div style={{ padding: '0 20px 16px 20px' }}>
          <button
            onClick={() => setShowTeamSelector(true)}
            style={{
              width: '100%',
              border: 0,
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: selectedTeam.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'white',
              }}>
                {selectedTeam.logo}
              </div>
              <span style={{ fontWeight: 'bold', color: '#333' }}>
                {selectedTeam.name}
              </span>
            </div>
            <span style={{ color: '#666', fontSize: '14px' }}>▼</span>
          </button>
        </div>
      )}
      
      <PlaceList
        places={currentData}
        onPlaceSelect={onPlaceSelect}
      />

      <TeamSelector 
        isVisible={showTeamSelector}
        teams={baseballTeams}
        selectedTeam={selectedTeam}
        onTeamSelect={handleTeamSelect}
        onClose={handleCloseTeamSelector}
      />
    </div>
  );
}