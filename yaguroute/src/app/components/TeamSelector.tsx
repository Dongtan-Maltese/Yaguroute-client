'use client';

import React from 'react';

// 구단 타입 정의
interface BaseballTeam {
  name: string;
  code: string;
  logo: string;
  color: string;
}

interface TeamSelectorProps {
  isVisible: boolean;
  teams: BaseballTeam[];
  selectedTeam: BaseballTeam;
  onTeamSelect: (team: BaseballTeam) => void;
  onClose: () => void;
}

export default function TeamSelector({
  isVisible,
  teams,
  selectedTeam,
  onTeamSelect,
  onClose
}: TeamSelectorProps) {
  if (!isVisible) {
    return null;
  }

  const handleTeamSelect = (team: BaseballTeam) => {
    onTeamSelect(team);
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        overflowY: 'auto'
      }}
    >
      {/* 바텀시트 핸들 */}
      <div style={{
        width: '40px',
        height: '4px',
        backgroundColor: '#ddd',
        borderRadius: '2px',
        margin: '12px auto',
        cursor: 'pointer'
      }} onClick={onClose} />

      <div style={{
        padding: '0 20px 20px 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: 'bold' 
          }}>
            어느 구단 선수의 맛집을 볼까요?
          </h3>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ✕
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          {teams.map((team, index) => (
            <button
              key={index}
              onClick={() => handleTeamSelect(team)}
              style={{
                padding: '16px 12px',
                border: selectedTeam.name === team.name ? `2px solid ${team.color}` : '1px solid #eee',
                borderRadius: '12px',
                backgroundColor: selectedTeam.name === team.name ? '#f8f9fa' : 'white',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedTeam.name !== team.name) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTeam.name !== team.name) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: team.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {team.logo}
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center'
              }}>
                {team.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}